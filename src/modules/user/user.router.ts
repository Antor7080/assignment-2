import { Router } from "express";
import { addNewUser } from "./user.controller";
import { createUserValidator } from "./user.validator";

const router = Router()

router.post('/', createUserValidator, addNewUser)

export { router as UserRouter };
