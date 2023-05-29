import { Router } from "express";

const router = Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    _v: "1.0.0",
    message: "RESTful API Music service",
  });
});

export default router;
