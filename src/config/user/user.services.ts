import { IUser, User } from "./index";

const createUser = async (user: object): Promise<IUser | null> => {
    const newUser = await User.create(user);
    return newUser
}

export { createUser };
