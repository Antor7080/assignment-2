import { NextFunction, Request, Response } from 'express';

const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const statusCode = err.message.includes('User not found') ? 404 : err.code || 500
  
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

export { errorHandler };

