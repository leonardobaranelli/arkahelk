type MaybeString = string | undefined;

export interface IUser {
  id: MaybeString;
  name: string;
  lastName: string;
  email: string;
  password: string;
  avatarUrl?: MaybeString;
  role?: 'user' | 'admin';
}

export interface IError extends Error {
  statusCode?: number;
}
