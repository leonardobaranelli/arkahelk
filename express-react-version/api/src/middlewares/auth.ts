import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../types/models.interfaces';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
): void | Response<any, Record<string, any>> => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  try {
    const decoded = jwt.verify(
      token as string,
      process.env.JWT_SECRET as string,
    ) as { id: string; email: string };
    req.user = decoded as IUser;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
