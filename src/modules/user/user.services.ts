import { IOrder, IUser, User } from "./index";

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

const updateByQuery = async (userId: number, data: object): Promise<IUser | any> => {
    const user = await User.isUserExist(userId);

    if (!user) {
        throw new Error('User not found');
    }
    const result = await User.findOneAndUpdate(
        { userId },
        { $set: data },
        { new: true, runValidators: true },
    );
    return result;
};

const deleteUserById = async (userId: number) => {
    const user = await User.isUserExist(userId);
    console.log(user);
    if (!user) {
        throw new Error('User not found');
    }
    const deletedUser = User.findOneAndDelete({ userId })
    return deletedUser

}


//addProductInOrder
const addProductInOrder = async (
    userId: number,
    productData: IOrder,
): Promise<IOrder[]> => {
    const user = await User.isUserExist(userId);
    if (!user) {
        throw new Error('User not found');
    }
    const result = await User.findOneAndUpdate(
        { userId },
        { $push: { orders: productData } },
        { new: true, runValidators: true }
    );
    if (!result) {
        // Handle the case where the update did not return the expected result
        throw new Error('Failed to add product to order');
    }
    console.log(result);
    return result.orders;
};

// get orders 

const getOrders = async (userId: number): Promise<IOrder[]> => {
    const user = await User.isUserExist(userId);
    if (!user) {
        throw new Error('User not found');
    }
    return user.orders;
};

const totalOrderPrice = async (userId: number, pipline: any) => {
    const user = await User.isUserExist(userId);
    if (!user) {
        throw new Error('User not found');
    }
    const total = User.aggregate(pipline)
    return total
} //

export { addProductInOrder, createUser, deleteUserById, findAllByAggregate, findAllByQuery, findOneByQuery, findOneByStaticMethod, getOrders, updateByQuery, totalOrderPrice };

