import { UserModel } from '@prisma/client';
import { User } from 'users/user.entity';

export interface IUsersRepository {
  create: (user: User) => Promise<UserModel>;
  find: (email: string) => Promise<UserModel | null>;
}
