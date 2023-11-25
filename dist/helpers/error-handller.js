"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    const statusCode = err.message.includes('User not found') ? 404 : err.code || 500;
    const message = err.description || err.message || 'Something went wrong!';
    console.log(err);
    return res.status(statusCode).json({
        success: false,
        message,
        error: {
            code: statusCode,
            description: message,
        },
    });
};
exports.errorHandler = errorHandler;
