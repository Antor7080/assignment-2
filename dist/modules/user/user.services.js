"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.totalOrderPrice = exports.updateByQuery = exports.getOrders = exports.findOneByStaticMethod = exports.findOneByQuery = exports.findAllByQuery = exports.findAllByAggregate = exports.deleteUserById = exports.createUser = exports.addProductInOrder = void 0;
const index_1 = require("./index");
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield index_1.User.create(user);
    return newUser;
});
exports.createUser = createUser;
const findOneByQuery = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield index_1.User.findOne(query);
    return user;
});
exports.findOneByQuery = findOneByQuery;
const findAllByQuery = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield index_1.User.find({ query }).select("username ");
    return users;
});
exports.findAllByQuery = findAllByQuery;
const findAllByAggregate = (pipline) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield index_1.User.aggregate(pipline);
    return users;
});
exports.findAllByAggregate = findAllByAggregate;
const findOneByStaticMethod = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield index_1.User.isUserExist(id);
    return user;
});
exports.findOneByStaticMethod = findOneByStaticMethod;
const updateByQuery = (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield index_1.User.isUserExist(userId);
    if (!user) {
        throw new Error('User not found');
    }
    const result = yield index_1.User.findOneAndUpdate({ userId }, { $set: data }, { new: true, runValidators: true });
    return result;
});
exports.updateByQuery = updateByQuery;
const deleteUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield index_1.User.isUserExist(userId);
    console.log(user);
    if (!user) {
        throw new Error('User not found');
    }
    const deletedUser = index_1.User.findOneAndDelete({ userId });
    return deletedUser;
});
exports.deleteUserById = deleteUserById;
//addProductInOrder
const addProductInOrder = (userId, productData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield index_1.User.isUserExist(userId);
    if (!user) {
        throw new Error('User not found');
    }
    const result = yield index_1.User.findOneAndUpdate({ userId }, { $push: { orders: productData } }, { new: true, runValidators: true });
    if (!result) {
        // Handle the case where the update did not return the expected result
        throw new Error('Failed to add product to order');
    }
    console.log(result);
    return result.orders;
});
exports.addProductInOrder = addProductInOrder;
// get orders 
const getOrders = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield index_1.User.isUserExist(userId);
    if (!user) {
        throw new Error('User not found');
    }
    return user.orders;
});
exports.getOrders = getOrders;
const totalOrderPrice = (userId, pipline) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield index_1.User.isUserExist(userId);
    if (!user) {
        throw new Error('User not found');
    }
    const total = index_1.User.aggregate(pipline);
    return total;
}); //
exports.totalOrderPrice = totalOrderPrice;
