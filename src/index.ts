import { AppDataSource } from "./data-source";
const userRouter = require("./routers/user.router");
import * as express from "express";
import * as dotenv from "dotenv";
import { Request, Response } from "express";
import "reflect-metadata";
dotenv.config();

const PORT = process.env.PORT || 5001;
const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ hello: "world" });
});

app.use("/users", userRouter);

app.listen(Number(PORT), "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});

AppDataSource.initialize();
