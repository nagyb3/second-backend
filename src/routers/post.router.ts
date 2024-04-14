import { Router } from "express";
import { Post } from "../entity/post.entity";
import { AppDataSource } from "../data-source";
import { User } from "../entity/user.entity";
import { Topic } from "../entity/topic.entity";

const router = Router();

// GET post by id
router.get("/:id", async (req, res) => {
  try {
    const post = await AppDataSource.getRepository("Post")
      .createQueryBuilder("post")
      .where("id = :id", { id: req.params.id })
      .getOneOrFail();

    res.json(post);
  } catch (error) {
    console.error({ error });
    res.status(500).json({ message: "Something went wrong" });
  }
});

// GET all posts
router.get("/", async (req, res) => {
  try {
    const allPosts = await AppDataSource.getRepository("Post")
      .createQueryBuilder("post")
      .getMany();

    res.json(allPosts);
  } catch (error) {
    console.error({ error });
    res.status(500).json({ message: "Something went wrong" });
  }
});

// POST: add post
router.post("/", async (req, res) => {
  const post: Post = new Post();
  try {
    const author: User = (await AppDataSource.getRepository("User")
      .createQueryBuilder("user")
      .where("id = :id", { id: req.body.authorUserId })
      .getOneOrFail()) as User;

    const topic = (await AppDataSource.getRepository("Topic")
      .createQueryBuilder("topic")
      .where("id = :id", { id: req.body.topicId })
      .getOneOrFail()) as Topic;

    post.title = req.body.title;
    post.description = req?.body?.description ?? "";
    post.author = author;
    post.topic = topic;

    await AppDataSource.getRepository("Post").save(post);
    res.json(post);
  } catch (error) {
    console.error({ error });
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
