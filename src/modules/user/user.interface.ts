import { Model } from "mongoose";

interface IOrder {
    productName: string;
    price: number;
    quantity: number;
}

interface IAddress {
    street: string;
    city: string;
    country: string;
}

interface IFullName {
    firstName: string;
    lastName: string;
}
interface IUser {
    
    userId: number;
    username: string;
    password: string;
    fullName: IFullName;
    age: number;
    email: string;
    isActive: boolean;
    hobbies: string[];
    address: IAddress;
    orders: IOrder[]
}
interface UserModel extends Model<IUser> {
    isUserExist(userId: number): Promise<IUser | null>
}
export { IOrder, IUser, UserModel };
