import { Router } from "express";
import { addNewUser, addProduct, deleteUser, findOne, fineAllUsers, getAllOrders, getTotal, updateUser, } from "./user.controller";
import { addOrderValidator, createUserValidator, updateUserValidator, } from "./user.validator";

const router = Router()

router.post('/', createUserValidator, addNewUser)
router.get("/:userId", findOne)
router.delete("/:userId", deleteUser)
router.put("/:userId", updateUserValidator, updateUser)
router.get('/', fineAllUsers);
router.put("/:userId/orders", addOrderValidator, addProduct)
router.get("/:userId/orders", getAllOrders)
router.get("/:userId/orders/total-price", getTotal)

export { router as UserRouter };

