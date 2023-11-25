"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getTotal = exports.getAllOrders = exports.fineAllUsers = exports.findOne = exports.deleteUser = exports.addProduct = exports.addNewUser = void 0;
const transformer_1 = require("../../helpers/transformer");
const user_services_1 = require("./user.services");
const addNewUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, username, email } = req.body;
        const query = {
            $or: [
                { userId: userId },
                { username: username },
                { email: email }
            ]
        };
        const isUserExist = yield (0, user_services_1.findOneByQuery)(query);
        if (isUserExist) {
            return next({
                description: "User already exists",
                code: 422
            });
        }
        ;
        const newUser = yield (0, user_services_1.createUser)(req.body);
        res.status(201).json({
            "success": true,
            "message": "User created successfully!",
            "data": (0, transformer_1.resTransformer)(newUser)
        });
    }
    catch (err) {
        next(err);
    }
});
exports.addNewUser = addNewUser;
const fineAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pipline = [
            {
                $project: {
                    username: 1, fullName: 1, age: 1, email: 1, address: 1, _id: 0
                }
            }
        ];
        const users = yield (0, user_services_1.findAllByAggregate)(pipline);
        if (!users) {
            return next({
                description: "User not found",
                code: 404,
            });
        }
        res.status(200).json({
            "success": true,
            "message": "Users fetched successfully!",
            "data": users
        });
    }
    catch (error) {
        next(error);
    }
});
exports.fineAllUsers = fineAllUsers;
const findOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        if (!userId)
            throw new Error("userId is invalid");
        const user = yield (0, user_services_1.findOneByStaticMethod)(userId);
        if (!user) {
            return next({
                "description": "User not found",
                "code": 404,
            });
        }
        res.status(200).json({
            "success": true,
            "message": "User updated successfully!",
            "data": (0, transformer_1.resTransformer)(user)
        });
    }
    catch (error) {
        next(error);
    }
});
exports.findOne = findOne;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId);
        const userData = req.body;
        const updateUser = yield (0, user_services_1.updateByQuery)(userId, userData);
        console.log(userData);
        res.status(200).json({
            success: true,
            message: 'User updated successfully!',
            data: updateUser,
        });
    }
    catch (error) {
        next({
            code: 500,
            description: error.message
        });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId);
        yield (0, user_services_1.deleteUserById)(userId);
        res.status(200).json({
            "success": true,
            "message": "User deleted successfully!",
            "data": null
        });
    }
    catch (error) {
        next({
            code: 500,
            description: error.message
        });
    }
});
exports.deleteUser = deleteUser;
const addProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId);
        const productData = req.body;
        const orders = yield (0, user_services_1.addProductInOrder)(userId, productData);
        res.status(200).json({
            "success": true,
            "message": "Order created successfully!",
            "data": null
        });
    }
    catch (error) {
        next({
            code: 500,
            description: error.message
        });
    }
});
exports.addProduct = addProduct;
const getAllOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId);
        const orders = yield (0, user_services_1.getOrders)(userId);
        res.status(200).json({
            success: true,
            messag: "Order fetched successfully!",
            data: orders
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllOrders = getAllOrders;
const getTotal = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId);
        const pipline = [
            {
                $match: {
                    userId: userId,
                },
            },
            { $unwind: '$orders' },
            {
                $group: {
                    _id: null,
                    totalPrice: {
                        $sum: {
                            $multiply: ['$orders.price', '$orders.quantity'],
                        },
                    },
                },
            },
            {
                $project: {
                    totalPrice: 1,
                    _id: 0,
                },
            },
        ];
        const total = yield (0, user_services_1.totalOrderPrice)(userId, pipline);
        res.status(200).json({
            "success": true,
            "message": "Total price calculated successfully!",
            data: total
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getTotal = getTotal;
