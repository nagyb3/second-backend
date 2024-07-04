import { AppDataSource } from "./data-source";
import * as express from "express";
import * as dotenv from "dotenv";
import { Request, Response } from "express";
import "reflect-metadata";
const cors = require("cors");

const userRouter = require("./routers/user.router");
const topicRouter = require("./routers/topic.router");
const postRouter = require("./routers/post.router");

dotenv.config();

const PORT = process.env.PORT || 5001;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ hello: "world" });
});

app.use("/users", userRouter);
app.use("/topic", topicRouter);
app.use("/post", postRouter);

app.listen(Number(PORT), "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});

AppDataSource.initialize()
  .then(() => console.log("db connection successful!"))
  .catch((error) =>
    console.error("error while trying establish db connection: ", error),
  );
