import Joi from 'joi';
import { validationHandler } from '../../helpers/validation-handler';

const createUserSchema = Joi.object({
    userId: Joi.number().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    fullName: Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
    }).required(),
    age: Joi.number().required(),
    email: Joi.string().email().required(),
    isActive: Joi.boolean().required(),
    hobbies: Joi.array().items(Joi.string()),
    address: Joi.object({
        street: Joi.string().required(),
        city: Joi.string().required(),
        country: Joi.string().required(),
    }).required(),
    orders: Joi.array().items(
        Joi.object({
            productName: Joi.string().required(),
            price: Joi.number().required(),
            quantity: Joi.number().required(),
        })
    ),
});

const createUserValidator = validationHandler({
    body: createUserSchema,
});


export { createUserValidator };

