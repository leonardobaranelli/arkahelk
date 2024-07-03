import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUrl,
  IsOptional,
  MinLength,
  Validate,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { IUser } from '../types/models.interfaces';

type MaybeString = string | undefined;

class IsAdminConstraint {
  validate(rol: any) {
    return rol === 'user' || rol === 'admin';
  }

  defaultMessage() {
    return 'Only admins can set the role to "admin"';
  }
}

export class CreateUserDto implements Omit<IUser, 'id'> {
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @IsString({ message: 'Name must be a string' })
  @Transform(({ value }) => value.trim())
  readonly name: string = '';

  @IsNotEmpty({ message: 'Last name cannot be empty' })
  @IsString({ message: 'Last name must be a string' })
  @Transform(({ value }) => value.trim())
  readonly lastName: string = '';

  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsEmail({}, { message: 'Email must be valid' })
  @Transform(({ value }) => value.trim())
  readonly email: string = '';

  @IsNotEmpty({ message: 'Password cannot be empty' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Transform(({ value }) => value.trim())
  password: string = '';

  @IsOptional()
  @IsUrl({}, { message: 'Avatar URL must be a valid URL' })
  @Transform(({ value }) => value.trim())
  readonly avatarUrl?: MaybeString;

  @IsString({ message: 'Only "user" or "admin" roles are allowed' })
  @Validate(IsAdminConstraint, {
    message: 'Only admins can set the role to "admin"',
  })
  readonly rol: 'user' = 'user';
}

export class UpdateUserDto implements Partial<IUser> {
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  @Transform(({ value }) => value.trim())
  name?: string;

  @IsOptional()
  @IsString({ message: 'Last name must be a string' })
  @Transform(({ value }) => value.trim())
  lastName?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email must be valid' })
  @Transform(({ value }) => value.trim())
  email?: string;

  @IsOptional()
  @IsString({ message: 'Password must be a string' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Transform(({ value }) => value.trim())
  password?: string;

  @IsOptional()
  @IsUrl({}, { message: 'Avatar URL must be a valid URL' })
  @Transform(({ value }) => value.trim())
  avatarUrl?: MaybeString;
}
