"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resTransformer = void 0;
const resTransformer = (paramsInput) => {
    let entityTransformed = [];
    const params = JSON.parse(JSON.stringify(paramsInput));
    if (params && Array.isArray(params)) {
        params.forEach((enumObj) => {
            entityTransformed.push(resEntity(enumObj));
        });
        return entityTransformed;
    }
    return resEntity(params);
};
exports.resTransformer = resTransformer;
// if  the entity is object
const resEntity = (menuObj) => {
    let data = menuObj;
    Object.keys(data).forEach((key) => {
        // remove is_deleted, __v, and audit_trails attributes
        if (key == "__v" || key == "password" || key == "orders") {
            delete data[key];
        }
    });
    return data;
};
