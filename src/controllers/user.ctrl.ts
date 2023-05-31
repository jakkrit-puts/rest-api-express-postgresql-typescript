import { RequestHandler } from "express";

import { User } from "../models/user.model";
import { NotFoundError, ValidationError } from "../utils/error";
import { validationResult } from "express-validator";

export const updateUser: RequestHandler = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new ValidationError(errors.array())
      throw error
    }

    const payload = req.body;
    
    // check id
    const hasId = await User.findByPk(payload.id);
    if (!hasId) {
      throw new NotFoundError("data not found");
    }

    await User.update({ fullname: payload.fullname }, { where: { id: payload.id } });
  
    return res.status(200).json({ message: "updated success" });
  } catch (error) {
    next(error);
  }
};

export const deleteUser: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;

    const hasId = await User.findByPk(id);
    if (!hasId) {
      throw new NotFoundError("data not found");
    }

    await User.destroy({ where: { id: id } });

    return res.status(200).json({ message: "remove success" });
  } catch (error) {
    next(error);
  }
};

export const getAllUser: RequestHandler = async (req, res, next) => {
  try {
    const user: User[] = await User.findAll();

    return res
      .status(200)
      .json({ result: user, message: "fetched successfully" });
  } catch (error) {
    next(error);
  }
};

export const getUserById: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;

    const hasId = await User.findByPk(id);
    if (!hasId) {
      throw new NotFoundError("data not found");
    }

    const user = await User.findByPk(id);

    return res
      .status(200)
      .json({ result: user, message: "fetched successfully" });
  } catch (error) {
    next(error);
  }
};

export const getProfile: RequestHandler = async (req, res, next) => {
  try {
    const id = res.locals.user.id;

    const hasId = await User.findByPk(id);
    if (!hasId) {
      throw new NotFoundError("data not found");
    }

    const user = await User.findByPk(id);

    return res
      .status(200)
      .json({ result: user, message: "fetched successfully" });
  } catch (error) {
    next(error);
  }
};
