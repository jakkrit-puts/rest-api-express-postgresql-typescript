import { RequestHandler } from "express";

import { Todo } from "../models/todo.model";
import { ConflictError, NotFoundError, ValidationError } from "../utils/error";
import { validationResult } from "express-validator";

export const createToDo: RequestHandler = async (req, res, next) => {
  try {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new ValidationError(errors.array())
      throw error
    }

    const todoExist = await Todo.findOne({  where: { name: req.body.name } })
    if (todoExist) {
      throw new ConflictError('todo name already exist')
    }

    const todos = await Todo.create({ ...req.body });

    return res
      .status(201)
      .json({ message: "created successfully", data: todos });
  } catch (error) {
    next(error);
  }
};

export const deleteToDo: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedTodo: Todo | null = await Todo.findByPk(id);

    if(deletedTodo === null) {
      throw new NotFoundError('data not found')
    }
    
    await Todo.destroy({ where: { id } });
    return res
      .status(200)
      .json({ message: "deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const getAllToDo: RequestHandler = async (req, res, next) => {
  try {
    const allTodos: Todo[] = await Todo.findAll();
    return res
      .status(200)
      .json({ message: "fetched successfully", data: allTodos });
  } catch (error) {
    next(error);
  }
};

export const getTodoById: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo: Todo | null = await Todo.findByPk(id);

    if(todo === null) {
      throw new NotFoundError('data not found')
    }

    return res
      .status(200)
      .json({ message: "fetched successfully", data: todo });
  } catch (error) {
    next(error);
  }
};

export const updateTodo: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Todo.update({ ...req.body }, { where: { id } });
    const updatedTodos: Todo | null = await Todo.findByPk(id);

    if(updatedTodos === null) {
      throw new NotFoundError('data not found')
    }

    return res
      .status(200)
      .json({ message: "updated successfully", data: updatedTodos });
  } catch (error) {
    next(error);
  }
};

