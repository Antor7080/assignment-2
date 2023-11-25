import { NextFunction, Request, Response } from "express";
import { resTransformer } from "../../helpers/transformer";
import { addProductInOrder, createUser, deleteUserById, findAllByAggregate, findOneByQuery, findOneByStaticMethod, getOrders, totalOrderPrice, updateByQuery } from "./user.services";

const addNewUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, username, email } = req.body;
        const query = {
            $or: [
                { userId: userId },
                { username: username },
                { email: email }
            ]
        }
        const isUserExist = await findOneByQuery(query);
        if (isUserExist) {
            return next({
                description: "User already exists",
                code: 422
            },)

        };

        const newUser = await createUser(req.body);

        res.status(201).json({
            "success": true,
            "message": "User created successfully!",
            "data": resTransformer(newUser)
        })
    }
    catch (err) {
        next(err)
    }
}

const fineAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const pipline = [
            {
                $project: {
                    username: 1, fullName: 1, age: 1, email: 1, address: 1, _id: 0
                }
            }
        ]
        const users = await findAllByAggregate(pipline);
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
        })
    } catch (error) {
        next(error)
    }
}

const findOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.params.userId);
        if (!userId) throw new Error("userId is invalid");
        const user = await findOneByStaticMethod(userId)
        if (!user) {
            return next({
                "description": "User not found",
                "code": 404,
            })
        }
        res.status(200).json({
            "success": true,
            "message": "User updated successfully!",
            "data": resTransformer(user)
        })
    } catch (error) {
        next(error)
    }
}

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = parseInt(req.params.userId);
        const userData = req.body;
        const updateUser = await updateByQuery(userId, userData);
        console.log(userData);
        res.status(200).json({
            success: true,
            message: 'User updated successfully!',
            data: updateUser,
        });
    } catch (error: any) {
        next({
            code: 500,
            description: error.message
        });
    }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = parseInt(req.params.userId);
        await deleteUserById(userId)
        res.status(200).json({
            "success": true,
            "message": "User deleted successfully!",
            "data": null
        });
    } catch (error: any) {
        next({
            code: 500,
            description: error.message
        });

    }
}

const addProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = parseInt(req.params.userId);
        const productData = req.body;
        const orders = await addProductInOrder(userId, productData);
        res.status(200).json({
            "success": true,
            "message": "Order created successfully!",
            "data": null
        });
    } catch (error: any) {
        next({
            code: 500,
            description: error.message
        });
    }
};
const getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = parseInt(req.params.userId);
        const orders = await getOrders(userId)
        res.status(200).json({
            success: true,
            messag: "Order fetched successfully!",
            data: orders
        })
    } catch (error) {
        next(error)
    }
}
const getTotal = async (req: Request, res: Response, next: NextFunction) => {
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
        ]
        const total = await totalOrderPrice(userId, pipline)
        res.status(200).json({
            "success": true,
            "message": "Total price calculated successfully!",
            data: total

        })
    } catch (error) {
        next(error)
    }
}

export { addNewUser, addProduct, deleteUser, findOne, fineAllUsers, getAllOrders, getTotal, updateUser };

