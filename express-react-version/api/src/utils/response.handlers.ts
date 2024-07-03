import axios from 'axios';
import { Request, Response, NextFunction } from 'express';
import { AllExceptionsFilter } from './all-exceptions.filter';
import { IError } from '@/types/models.interfaces';

const allExceptionsFilter = new AllExceptionsFilter();

export const handleError = (
  err: IError,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  allExceptionsFilter.catch(err, req, res, next);
};

export const handleNotFound = (
  _req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const error = new Error('Not Found');
  res.status(404).json({ message: error.message });
  next(error);
};

//Controllers response
export const sendSuccessResponse = (
  res: Response,
  data: any,
  message: string,
  statusCode: number = 200,
): void => {
  res.status(statusCode).json({ message, data });
};

//Controllers response
export const sendErrorResponse = (
  res: Response,
  error: IError,
  statusCode: number = 400,
): void => {
  const message = axios.isAxiosError(error)
    ? error.response?.statusText
    : (error as Error).message || 'Unknown error';

  res.status(statusCode).json({ message });
};
