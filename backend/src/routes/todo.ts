import * as todoController from "../controllers/todo";
import express from "express";
const router = express.Router();
router.get("/",  todoController.getTodos);
router.post("/",todoController.createTodo);
router.get("/:id",todoController.getTodo);
router.patch("/:id",todoController.updateTodo);
router.delete("/:id",todoController.deleteTodo);
export default router;