import { inject, injectable } from 'inversify';
import { UserModel } from '@prisma/client';

import { User } from 'controllers/users/user.entity';
import { DatabaseService } from 'common/database.service';
import { TYPES } from 'utils/constants';

import { IUsersRepository } from 'interface/users.repository.interface';

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
