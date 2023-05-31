import { Router } from "express";

import {
  createToDo,
  deleteToDo,
  getAllToDo,
  updateTodo,
  getTodoById,
} from "../controllers/todo.ctrl";
import { TodoCreateValidateData } from "../validations/todo.validation";
import { checkSchema } from "express-validator";
import jwtAuth from "../middlewares/jwt_auth";

const router = Router();

router.post("/", jwtAuth, checkSchema(TodoCreateValidateData), createToDo);
router.get("/", jwtAuth, getAllToDo);
router.get("/:id", jwtAuth, getTodoById);
router.put("/:id", jwtAuth, updateTodo);
router.delete("/:id", jwtAuth, deleteToDo);

export default router;
