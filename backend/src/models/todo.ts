import mongoose from "mongoose";
import { TodoType } from "../shared/types";

const todoSchema = new mongoose.Schema<TodoType>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  lastUpdated: { type: Date, required: true },
});

const Todo = mongoose.model<TodoType>("Todo", todoSchema);
export default Todo;
