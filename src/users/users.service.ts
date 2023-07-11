import { UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';

import { User } from 'users/user.entity';
import { UserLoginDto } from 'users/dto/user-login.dto';
import { UserRegisterDto } from 'users/dto/user-register.dto';
import { TYPES } from 'utils/constants';

import { IUsersService } from 'interface/users.service.interface';
import { IConfigService } from 'interface/config.service.interface';
import { IUsersRepository } from 'interface/users.repository.interface';

@injectable()
export class UsersService implements IUsersService {
  // @ts-ignore
  constructor(
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.UsersRepository) private usersRepository: IUsersRepository,
  ) {}

  async createUser({ email, name, password }: UserRegisterDto): Promise<UserModel | null> {
    const existedUser = await this.usersRepository.find(email);
    const newUser = new User(email, name);
    const salt = this.configService.get('SALT');

    await newUser.setPassword(password, parseInt(salt));

    if (existedUser) return null;

    return this.usersRepository.create(newUser);
  }

  async validateUser(dto: UserLoginDto): Promise<boolean> {
    return true;
  }
}
