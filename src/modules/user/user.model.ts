import bcrypt from 'bcrypt';
import mongoose, { Schema } from 'mongoose';
import { IOrder, IUser, UserModel } from './user.interface';

const orderScehma = new Schema<IOrder>({
    productName: {
        type: String,
        required: [true, 'Product name is required in the order'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required in the order'],
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required in the order'],
    },
})
const userSchema = new Schema<IUser, UserModel>({
    userId: {
        type: Number,
        required: [true, 'User ID is required'],
        unique: true,
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    fullName: {
        firstName: {
            type: String,
            required: [true, 'First name is required'],
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required'],
        },
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: {
            validator: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            message: 'Invalid email address',
        },
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    hobbies: {
        type: [String],
        default: [],
    },
    address: {
        street: {
            type: String,
            required: [true, 'Street is required'],
        },
        city: {
            type: String,
            required: [true, 'City is required'],
        },
        country: {
            type: String,
            required: [true, 'Country is required'],
        },
    },
    orders: [{
        type: orderScehma,

    }]
});
userSchema.statics.isUserExist = async function (
    userId: number
): Promise<IUser | null> {
    return this.findOne({ userId });
};
// Hash the password before saving
userSchema.pre<IUser>('save', async function (next) {
    const user: any = this;
    if (!user.isModified('password')) return next();

    const saltRounds = 10;
    try {
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        user.password = hashedPassword;
        next();
    } catch (error: any) {
        return next(error);
    }
});

const User = mongoose.model<IUser, UserModel>('User', userSchema);

export{ User};
