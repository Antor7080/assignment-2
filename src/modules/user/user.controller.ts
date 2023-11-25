import { NextFunction, Request, Response } from "express";
import { resTransformer } from "../../helpers/transformer";
import { createUser, findOneByQuery } from "./user.services";

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

        res.status(200).json({
            "success": true,
            "message": "User created successfully!",
            "data": resTransformer(newUser)
        })
    }


    catch (err) {
        next(err)
    }
}
export { addNewUser };

