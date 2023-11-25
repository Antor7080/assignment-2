import { NextFunction, Request, Response } from 'express';

const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const statusCode = err.code || 500;
    const message = err.description || 'Something went wrong!';

    return res.status(statusCode).json({
        success: false,
        message,
        error: err,
    });
};

export { errorHandler };

