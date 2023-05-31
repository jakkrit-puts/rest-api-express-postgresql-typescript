import { Router } from "express";

import { deleteUser, getAllUser, getProfile, getUserById, updateUser } from "../controllers/user.ctrl";

const router = Router();


router.get("/", getAllUser);
router.get("/:id", getUserById);
router.get("/me", getProfile);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;