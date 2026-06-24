import { IUser } from '@/interfaces/IUser';

export type CreateUserProps = {
  name: string;
  password: string;
  role: string;
};

export type UpdateUserProps = Partial<Omit<CreateUserProps, 'password'>> & {
  password?: string;
};

export type UserPersistence = IUser;
