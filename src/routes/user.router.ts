import { Router } from "express";

import { deleteUser, getAllUser, getProfile, updateUser } from "../controllers/user.ctrl";
import jwtAuth from "../middlewares/jwt_auth";

const router = Router();

router.get("/", jwtAuth,  getAllUser);
router.get("/me", jwtAuth, getProfile);
router.put("/", jwtAuth, updateUser);
router.delete("/:id", jwtAuth, deleteUser);

export default router;