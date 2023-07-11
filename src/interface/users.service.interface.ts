import { UserModel } from '@prisma/client';
import { UserLoginDto } from 'controllers/users/dto/user-login.dto';
import { UserRegisterDto } from 'controllers/users/dto/user-register.dto';

export interface IUsersService {
  createUser: (dto: UserRegisterDto) => Promise<UserModel | null>;
  validateUser: (dto: UserLoginDto) => Promise<boolean>;
  getUserInfo: (email: string) => Promise<UserModel | null>;
}
