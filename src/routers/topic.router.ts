import { Router } from "express";
import { Topic } from "../entity/topic.entity";
import { AppDataSource } from "../data-source";

const router = Router();

// GET topic by id
router.get("/:id", async (req, res) => {
  try {
    const topic = await AppDataSource.getRepository("Topic")
      .createQueryBuilder("topic")
      .where("id = :id", { id: req.params.id })
      .getOneOrFail();

    res.json(topic);
  } catch (error) {
    console.error({ error });
    res.status(500).json({ message: "Something went wrong" });
  }
});

// GET all topics
router.get("/", async (req, res) => {
  try {
    const allTopics = await AppDataSource.getRepository("Topic")
      .createQueryBuilder("topic")
      .getMany();

    res.json(allTopics);
  } catch (error) {
    console.error({ error });
    res.status(500).json({ message: "Something went wrong" });
  }
});

// POST: add topic
router.post("/", async (req, res) => {
  const topic: Topic = new Topic();
  try {
    topic.title = req.body.title;
    topic.description = req?.body?.description ?? "";

    await AppDataSource.getRepository("Topic").save(topic);

    res.json(topic);
  } catch (error) {
    console.error({ error });
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
