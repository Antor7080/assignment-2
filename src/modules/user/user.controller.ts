import { NextFunction, Request, Response } from "express";
import { resTransformer } from "../../helpers/transformer";
import { createUser, findAllByAggregate, findOneByQuery, findOneByStaticMethod } from "./user.services";

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
                "description": "User already exists",
                "code": 500,
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
                "description": "User notFound",
                "code": 500,
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
        if (!userId) throw new Error("userId is required");
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
export { addNewUser, findOne, fineAllUsers };

