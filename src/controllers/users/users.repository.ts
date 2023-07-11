import { inject, injectable } from 'inversify';
import { UserModel } from '@prisma/client';

import { User } from 'users/user.entity';

import { IUsersRepository } from 'interface/users.repository.interface';
import { DatabaseService } from 'common/database.service';
import { TYPES } from 'utils/constants';

@injectable()
export class UsersRepository implements IUsersRepository {
  constructor(@inject(TYPES.DatabaseService) private databaseService: DatabaseService) {}

  async create({ email, password, name }: User): Promise<UserModel> {
    return this.databaseService.client.userModel.create({
      data: {
        email,
        password,
        name,
      },
    });
  }

  async find(email: string): Promise<UserModel | null> {
    return this.databaseService.client.userModel.findUnique({
      where: {
        email,
      },
    });
  }
}
