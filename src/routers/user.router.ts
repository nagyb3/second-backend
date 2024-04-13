import { Router } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/user.entity";

const bcrypt = require("bcryptjs");
const router = Router();

// test
router.get("/hello-world", (req, res) => {
  res.json({ message: "Hello World from user.router.ts!" });
});

// GET user by id
router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  const user = await AppDataSource.getRepository("User")
    .createQueryBuilder("user")
    .where("user.id = :id", { id: userId })
    .getOne();

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.json(user);
});

// GET all users
router.get("/", async (req, res) => {
  const users = await AppDataSource.getRepository("User").find();
  return res.json(users);
});

// POST: signup new user
router.post("/", async (req, res) => {
  const { firstName, lastName, password, email } = req.body;
  const user: User = new User();

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  user.firstName = firstName;
  user.lastName = lastName;
  user.password = hashedPassword;
  user.email = email;

  await AppDataSource.getRepository("User").save(user);
  return res.json(user);
});

module.exports = router;
