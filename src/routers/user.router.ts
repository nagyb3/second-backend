import { Router } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/user.entity";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = Router();

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
  try {
    const users = await AppDataSource.getRepository("User").find();
    return res.json(users);
  } catch (error) {
    console.error({ error });
    return res.status(500).json({ message: "Something went wrong" });
  }
});

// POST: signup new user
router.post("/sign-up", async (req, res) => {
  const user: User = new User();
  try {
    const { firstName, lastName, password, email } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    user.firstName = firstName;
    user.lastName = lastName;
    user.password = hashedPassword;
    user.email = email;

    await AppDataSource.getRepository("User").save(user);
  } catch (error) {
    console.error({ error });
    return res.status(500).json({ message: "Something went wrong" });
  }
  console.log("sign-up success");
  return res.json(user);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await AppDataSource.getRepository("User")
    .createQueryBuilder("user")
    .where("user.email = :email", { email })
    .getOne();

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: 60 * 60,
    }
  );

  if (user && bcrypt.compareSync(password, user.password)) {
    return res.json({ token: token });
  }
  return res.status(401).json({ message: "Invalid credentials" });
});

module.exports = router;
