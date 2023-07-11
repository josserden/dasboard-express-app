import { injectable } from 'inversify';

import { User } from 'users/user.entity';
import { UserLoginDto } from 'users/dto/user-login.dto';
import { UserRegisterDto } from 'users/dto/user-register.dto';

import { IUsersService } from 'interface/users.service.interface';

@injectable()
export class UsersService implements IUsersService {
  async createUser({ email, name, password }: UserRegisterDto): Promise<User | null> {
    const newUser = new User(email, name);
    await newUser.setPassword(password);

    // check if user exists
    // if not, save user and return
    // if exists, return null

    return null;
  }

  async validateUser(dto: UserLoginDto): Promise<boolean> {
    return true;
  }
}
