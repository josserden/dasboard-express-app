import express from "express";

const userRouter = express.Router();

userRouter.post("/register", (_, res) => {
  res.send("register");
});

userRouter.post("/login", (_, res) => {
  res.send("login");
});

export { userRouter };
