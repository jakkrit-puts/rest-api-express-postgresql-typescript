import { Request, Response, NextFunction } from "express";
import { BaseError, ValidationError } from "../utils/error";

// error handler middleware
const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ValidationError) {
    return res.status(err.status).json({
      status: "fail",
      message: err.message,
      data: err.errorData,
    });
  } else if (err instanceof BaseError) {
    if (err.isOperational) {
      return res.status(err.status).json({
        status: err.status < 500 && err.status >= 400 ? "fail" : "error",
        message: err.message,
      });
      //
    } else {
      // log the error
      console.log(err);
      // send generic error message
      return res.status(err.status).json({
        status: "error",
        message: "Something went wrong",
      });
    }
  } else {
    // default error
    return res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
};

export { errorHandler };
