// src/middleware/errorMiddleware.ts
import { NextFunction, Request, Response } from 'express';

const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
};

export default errorMiddleware;
