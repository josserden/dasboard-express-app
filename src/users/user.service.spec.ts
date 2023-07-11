import 'reflect-metadata';
import { UserModel } from '@prisma/client';
import { Container } from 'inversify';

import { UsersService } from './users.service';
import { User } from './user.entity';
import { TYPES } from '../utils/constants';

import { IConfigService } from 'interface/config.service.interface';
import { IUsersRepository } from 'interface/users.repository.interface';
import { IUsersService } from 'interface/users.service.interface';

const ConfigServiceMock: IConfigService = {
  get: jest.fn(),
};

const UsersRepositoryMock: IUsersRepository = {
  find: jest.fn(),
  create: jest.fn(),
};

const container = new Container();
let configService: IConfigService;
let usersRepository: IUsersRepository;
let usersService: IUsersService;

beforeAll(async (): Promise<void> => {
  container.bind<IUsersService>(TYPES.UsersService).to(UsersService);
  container.bind<IConfigService>(TYPES.ConfigService).toConstantValue(ConfigServiceMock);
  container.bind<IUsersRepository>(TYPES.UsersRepository).toConstantValue(UsersRepositoryMock);

  configService = container.get<IConfigService>(TYPES.ConfigService);
  usersRepository = container.get<IUsersRepository>(TYPES.UsersRepository);
  usersService = container.get<IUsersService>(TYPES.UsersService);
});

let createdUser: UserModel | null;

describe('User Service', (): void => {
  it('createUser', async () => {
    configService.get = jest.fn().mockReturnValueOnce('1');

    usersRepository.create = jest.fn().mockImplementationOnce((user: User) => ({
      name: user.name,
      email: user.email,
      password: user.password,
      id: 1,
    }));

    createdUser = await usersService.createUser({
      email: 'x@x.test',
      name: 'John Doe',
      password: '1',
    });

    expect(createdUser?.id).toEqual(1);
    expect(createdUser?.password).not.toEqual('1');
  });

  it('validateUser - success', async () => {
    usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);
    const res = await usersService.validateUser({
      email: 'x@x.test',
      password: '1',
    });

    expect(res).toBeTruthy();
  });

  it('validateUser - wrong password', async () => {
    usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);
    const res = await usersService.validateUser({
      email: 'x@x.test',
      password: '2',
    });

    expect(res).toBeFalsy();
  });

  it('validateUser - wrong user', async () => {
    usersRepository.find = jest.fn().mockReturnValueOnce(null);
    const res = await usersService.validateUser({
      email: 'x@x.test',
      password: '2',
    });

    expect(res).toBeFalsy();
  });
});
