import { validateOrReject } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { Request, Response } from 'express';
import {
  sendSuccessResponse,
  sendErrorResponse,
} from '../utils/response.handlers';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dtos';
import UserService from '../services/users.service';
import { IUser } from '../types/models.interfaces';
import { isValidationErrorArray } from '../utils/validation.helpers';

export default class UsersController {
  public static getAll = async (
    _req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const users: IUser[] = await UserService.getAllUsers();
      sendSuccessResponse(res, users, 'Users retrieved successfully');
    } catch (error: any) {
      sendErrorResponse(res, error, error.statusCode || 400);
    }
  };

  public static getByUsername = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const username = req.params.username as string;

    try {
      const user: IUser | null = await UserService.getUserByUsername(username);
      sendSuccessResponse(
        res,
        user,
        `Username ${username} retrieved successfully`,
      );
    } catch (error: any) {
      sendErrorResponse(res, error, error.statusCode || 400);
    }
  };

  public static getById = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const userId = req.params.id as string;

    try {
      const user: IUser | null = await UserService.getUserById(userId);
      sendSuccessResponse(res, user, 'User retrieved successfully');
    } catch (error: any) {
      sendErrorResponse(res, error, error.statusCode || 400);
    }
  };

  public static login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body as { email: string; password: string };

    try {
      const token: string = await UserService.login(email, password);
      sendSuccessResponse(res, { token }, 'Login successful');
    } catch (error: any) {
      sendErrorResponse(res, error, error.statusCode || 400);
    }
  };

  public static register = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const userData: CreateUserDto = plainToClass(
      CreateUserDto,
      req.body,
    ) as CreateUserDto;

    try {
      await validateOrReject(userData);

      const newUser: IUser | null = await UserService.registerUser(userData);
      sendSuccessResponse(res, newUser, 'User created successfully', 201);
    } catch (error: any) {
      if (isValidationErrorArray(error)) {
        const errorMessage: string = error
          .map((err) => Object.values(err.constraints || {}))
          .join(', ');
        sendErrorResponse(res, new Error(errorMessage));
      } else {
        sendErrorResponse(res, error as Error);
      }
    }
  };

  public static updateByUsername = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const username = req.params.username as string;
    const newData: UpdateUserDto = req.body as UpdateUserDto;

    try {
      const updatedUser: IUser | null = await UserService.updateUserByUsername(
        username,
        newData,
      );
      sendSuccessResponse(
        res,
        updatedUser,
        `User ${username} updated successfully`,
      );
    } catch (error: any) {
      sendErrorResponse(res, error, error.statusCode || 400);
    }
  };

  public static updateById = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const userId = req.params.id as string;
    const newData: UpdateUserDto = req.body as UpdateUserDto;

    try {
      const updatedUser: IUser | null = await UserService.updateUserById(
        userId,
        newData,
      );
      sendSuccessResponse(
        res,
        updatedUser,
        `User with ID ${userId} updated successfully`,
      );
    } catch (error: any) {
      sendErrorResponse(res, error, error.statusCode || 400);
    }
  };

  public static deleteAll = async (
    _req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      await UserService.deleteAllUsers();
      sendSuccessResponse(res, null, 'All users deleted successfully');
    } catch (error: any) {
      sendErrorResponse(res, error, error.statusCode || 400);
    }
  };

  public static deleteByUsername = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const username = req.params.username as string;

    try {
      await UserService.deleteUserByUsername(username);
      sendSuccessResponse(
        res,
        null,
        `Username ${username} deleted successfully`,
      );
    } catch (error: any) {
      sendErrorResponse(res, error, error.statusCode || 400);
    }
  };

  public static deleteById = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const userId = req.params.id as string;

    try {
      await UserService.deleteUserById(userId);
      sendSuccessResponse(
        res,
        null,
        `User with ID ${userId} deleted successfully`,
      );
    } catch (error: any) {
      sendErrorResponse(res, error, error.statusCode || 400);
    }
  };
}
