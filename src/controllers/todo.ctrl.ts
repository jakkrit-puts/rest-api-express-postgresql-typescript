import { RequestHandler } from "express";

import { Todos } from "../models/todo.model";
import { ConflictError, NotFoundError, ValidationError } from "../utils/error";
import { validationResult } from "express-validator";

export const createToDo: RequestHandler = async (req, res, next) => {
  try {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new ValidationError(errors.array())
      throw error
    }

    const todoExist = await Todos.findOne({  where: { name: req.body.name } })
    if (todoExist) {
      throw new ConflictError('todo name already exist')
    }

    const todos = await Todos.create({ ...req.body });

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

    const deletedTodo: Todos | null = await Todos.findByPk(id);

    if(deletedTodo === null) {
      throw new NotFoundError('data not found')
    }
    
    await Todos.destroy({ where: { id } });
    return res
      .status(200)
      .json({ message: "deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const getAllToDo: RequestHandler = async (req, res, next) => {
  try {
    const allTodos: Todos[] = await Todos.findAll();
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
    const todo: Todos | null = await Todos.findByPk(id);

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
    await Todos.update({ ...req.body }, { where: { id } });
    const updatedTodos: Todos | null = await Todos.findByPk(id);

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

