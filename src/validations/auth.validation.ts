import { Schema } from "express-validator";

export const LoginValidateData: Schema = {
  username: { notEmpty: true, errorMessage: "username required" },
  password: { notEmpty: true, errorMessage: "password required" },
};

export const RegisterValidateData: Schema = {
  username: { notEmpty: true, errorMessage: "username required" },
  password: { notEmpty: true, errorMessage: "password required" },
  fullname: { notEmpty: true, errorMessage: "fullname required" },
};