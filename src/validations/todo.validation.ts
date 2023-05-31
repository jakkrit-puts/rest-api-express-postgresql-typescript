import { Schema } from "express-validator";

export const TodoCreateValidateData: Schema = {
  name: { notEmpty: true, errorMessage: "name required" },
  description: { notEmpty: true, errorMessage: "description required" },
};