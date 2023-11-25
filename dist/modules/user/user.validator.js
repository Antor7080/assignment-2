"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addOrderValidator = exports.updateUserValidator = exports.createUserValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const validation_handler_1 = require("../../helpers/validation-handler");
const createUserSchema = joi_1.default.object({
    userId: joi_1.default.number().required(),
    username: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
    fullName: joi_1.default.object({
        firstName: joi_1.default.string().required(),
        lastName: joi_1.default.string().required(),
    }).required(),
    age: joi_1.default.number().required(),
    email: joi_1.default.string().email().required(),
    isActive: joi_1.default.boolean().required(),
    hobbies: joi_1.default.array().items(joi_1.default.string()),
    address: joi_1.default.object({
        street: joi_1.default.string().required(),
        city: joi_1.default.string().required(),
        country: joi_1.default.string().required(),
    }).required(),
    orders: joi_1.default.array().items(joi_1.default.object({
        productName: joi_1.default.string().required(),
        price: joi_1.default.number().required(),
        quantity: joi_1.default.number().required(),
    })),
});
const updateUserSchema = joi_1.default.object({
    userId: joi_1.default.number(),
    username: joi_1.default.string(),
    password: joi_1.default.string(),
    fullName: joi_1.default.object({
        firstName: joi_1.default.string(),
        lastName: joi_1.default.string(),
    }),
    age: joi_1.default.number(),
    email: joi_1.default.string().email(),
    isActive: joi_1.default.boolean(),
    hobbies: joi_1.default.array().items(joi_1.default.string()),
    address: joi_1.default.object({
        street: joi_1.default.string(),
        city: joi_1.default.string(),
        country: joi_1.default.string(),
    }),
    orders: joi_1.default.array().items(joi_1.default.object({
        productName: joi_1.default.string(),
        price: joi_1.default.number(),
        quantity: joi_1.default.number(),
    })),
});
const orderScehma = joi_1.default.object({
    productName: joi_1.default.string().required(),
    price: joi_1.default.number().required(),
    quantity: joi_1.default.number().required(),
});
const createUserValidator = (0, validation_handler_1.validationHandler)({
    body: createUserSchema,
});
exports.createUserValidator = createUserValidator;
const updateUserValidator = (0, validation_handler_1.validationHandler)({
    body: updateUserSchema,
});
exports.updateUserValidator = updateUserValidator;
const addOrderValidator = (0, validation_handler_1.validationHandler)({
    body: orderScehma,
});
exports.addOrderValidator = addOrderValidator;
