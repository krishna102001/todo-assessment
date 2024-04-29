import express, { Request, Response } from "express";
import Todo from "../models/todo";
import { TodoType } from "../shared/types";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/",
  [
    body("title").notEmpty().withMessage("title is required"),
    body("description").notEmpty().withMessage("description is required"),
  ],
  async (req: Request, res: Response) => {
    try {
      const newTodo: TodoType = req.body;
      newTodo.lastUpdated = new Date();

      const todo = new Todo(newTodo);
      await todo.save();
      res.sendStatus(201);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.post("/delete", async (req: Request, res: Response) => {
  try {
    var id = req.body.todo_id;
    await Todo.findByIdAndDelete(id);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching data" });
  }
});

router.post("/update", async (req: Request, res: Response) => {
  try {
    var id = req.body.todo_id;
    await Todo.findByIdAndUpdate(id, req.body);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching data" });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const todos: TodoType[] = await Todo.find({});
    res.status(200).json(todos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching data" });
  }
});

export default router;
