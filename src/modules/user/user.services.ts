import { IUser, User } from "./index";

const createUser = async (user: object): Promise<IUser> => {
    const newUser = await User.create(user);
    return newUser
}

const findOneByQuery = async (query: object): Promise<IUser | null> => {
    const user = await User.findOne(query)
    return user
}

const findAllByQuery = async (query?: object): Promise<IUser[] | null> => {
    const users = await User.find({ query }).select("username ")
    return users
};

const findAllByAggregate = async (pipline: any): Promise<IUser[] | null> => {
    const users = await User.aggregate(pipline)
    return users
}
const findOneByStaticMethod = async (id: number): Promise<IUser | null> => {
    const user = await User.isUserExist(id)
    return user
}

export { createUser, findAllByAggregate, findAllByQuery, findOneByQuery , findOneByStaticMethod};

