import { IUser, User } from "./index";

const createUser = async (user: object): Promise<IUser> => {
    const newUser = await User.create(user);
    return newUser
}

const findOneByQuery = async (query: object): Promise<IUser | null> => {
    const user = await User.findOne(query)
    return user
}

export { createUser, findOneByQuery };

