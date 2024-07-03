import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dtos';
import { IUser, IError } from '../types/models.interfaces';

export default class UserService {
  public static async getAllUsers(): Promise<IUser[]> {
    try {
      const allUsers: IUser[] = await User.findAll();
      if (allUsers.length === 0) {
        const error: IError = new Error('There are no users registered yet');
        error.statusCode = 404;
        throw error;
      }
      return allUsers;
    } catch (error) {
      throw error;
    }
  }

  public static async getUserByUsername(username: string): Promise<IUser> {
    try {
      const user: IUser | null = await User.findOne({
        where: { email: username },
      });
      if (!user) {
        const error: IError = new Error(`Username ${username} not found`);
        error.statusCode = 404;
        throw error;
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  public static async getUserById(id: string): Promise<IUser> {
    try {
      const user: IUser | null = await User.findByPk(id);
      if (!user) {
        const error: IError = new Error(`User with ${id} not found`);
        error.statusCode = 404;
        throw error;
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  public static async registerUser(userData: CreateUserDto): Promise<IUser> {
    const { email } = userData;

    try {
      const existingUser: IUser | null = await User.findOne({
        where: { email },
      });
      if (existingUser) {
        const error: IError = new Error(
          `User ${email} has already been registered`,
        );
        error.statusCode = 409;
        throw error;
      }

      const hashedPassword: string = await bcrypt.hash(userData.password, 10);
      userData.password = hashedPassword;

      const newUser: IUser = await User.create(userData);

      return newUser;
    } catch (error) {
      throw error;
    }
  }

  public static async login(email: string, password: string): Promise<string> {
    try {
      const user: IUser | null = await User.findOne({ where: { email } });

      if (!user) {
        const error: IError = new Error(`User not found`);
        error.statusCode = 404;
        throw error;
      }

      const passwordMatch: boolean = await bcrypt.compare(
        password,
        user.password,
      );

      if (!passwordMatch) {
        const error: IError = new Error('Invalid credentials');
        error.statusCode = 401;
        throw error;
      }

      const token: string = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' },
      );

      return token;
    } catch (error) {
      throw error;
    }
  }

  public static async updateUserByUsername(
    username: string,
    newData: UpdateUserDto,
  ): Promise<IUser> {
    try {
      const [updatedRows]: [number] = await User.update(newData, {
        where: { email: username },
      });
      if (updatedRows === 0) {
        const error: IError = new Error(`Username ${username} not found`);
        error.statusCode = 404;
        throw error;
      }
      const updatedUser: IUser | null = await User.findOne({
        where: { email: username },
      });
      return updatedUser as IUser;
    } catch (error) {
      throw error;
    }
  }

  public static async updateUserById(
    id: string,
    newData: UpdateUserDto,
  ): Promise<IUser> {
    try {
      const [updatedRows]: [number] = await User.update(newData, {
        where: { id },
      });
      if (updatedRows === 0) {
        const error: IError = new Error(`User with ID ${id} not found`);
        error.statusCode = 404;
        throw error;
      }
      const updatedUser: IUser | null = await User.findByPk(id);
      return updatedUser as IUser;
    } catch (error) {
      throw error;
    }
  }

  public static async deleteAllUsers(): Promise<void> {
    try {
      const deletedRows: number = await User.destroy({ where: {} });
      if (deletedRows === 0) {
        const error: IError = new Error('No users to delete');
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }

  public static async deleteUserByUsername(username: string): Promise<void> {
    try {
      const deletedRows: number = await User.destroy({
        where: { email: username },
      });
      if (deletedRows === 0) {
        const error: IError = new Error(`Username ${username} not found`);
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }

  public static async deleteUserById(id: string): Promise<void> {
    try {
      const deletedRows: number = await User.destroy({ where: { id } });
      if (deletedRows === 0) {
        const error: IError = new Error(`User with ID ${id} not found`);
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }
}
