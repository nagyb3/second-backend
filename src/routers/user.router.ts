import { Router } from "express";
const router = Router();

router.get("/hello-world", (req, res) => {
  res.json({ message: "Hello World from user.router.ts!" });
});

module.exports = router;
