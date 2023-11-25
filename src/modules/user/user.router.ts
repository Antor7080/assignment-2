import { Router } from "express";
import { addNewUser, findOne, fineAllUsers } from "./user.controller";
import { createUserValidator } from "./user.validator";

const router = Router()

router.post('/', createUserValidator, addNewUser)
router.get("/:userId", findOne)
router.get('/', fineAllUsers);

export { router as UserRouter };

