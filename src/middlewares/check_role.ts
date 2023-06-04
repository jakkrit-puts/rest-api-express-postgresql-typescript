import { Request, Response, NextFunction } from "express";

const isRoleAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { role } = res.locals.user;

    if (role === "Admin") {
      next();
    } else {
      return res.status(403).json({
        error: {
          message: `Access Denied, Admin Only`,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

export { isRoleAdmin };