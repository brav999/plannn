import { Request, Response, NextFunction } from 'express';

export const notFoundMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    res.status(404).json({
        status: 'error',
        message: `Can't find ${req.originalUrl} on this server!`
    });
};