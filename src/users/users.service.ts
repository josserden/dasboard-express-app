import { inject, injectable } from 'inversify';

import { User } from 'users/user.entity';
import { UserLoginDto } from 'users/dto/user-login.dto';
import { UserRegisterDto } from 'users/dto/user-register.dto';
import { TYPES } from 'utils/constants';

import { IUsersService } from 'interface/users.service.interface';
import { IConfigService } from 'interface/config.service.interface';

@injectable()
export class UsersService implements IUsersService {
  // @ts-ignore
  constructor(@inject(TYPES.ConfigService) private configService: IConfigService) {}

  async createUser({ email, name, password }: UserRegisterDto): Promise<User | null> {
    const newUser = new User(email, name);
    const salt = this.configService.get('SALT');

    await newUser.setPassword(password, parseInt(salt));

    // check if user exists
    // if not, save user and return
    // if exists, return null

    return null;
  }

  async validateUser(dto: UserLoginDto): Promise<boolean> {
    return true;
  }
}
