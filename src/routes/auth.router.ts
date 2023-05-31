import { Router } from "express";

import { login, register } from "../controllers/auth.ctrl";
import { LoginValidateData, RegisterValidateData } from "../validations/auth.validation";
import { checkSchema } from "express-validator";


const router = Router();


router.post("/login", checkSchema(LoginValidateData), login);
router.post("/register", checkSchema(RegisterValidateData), register);

export default router;