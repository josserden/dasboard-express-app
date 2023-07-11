import { Container, ContainerModule } from 'inversify';

import { App } from 'app';
import { ConfigService } from 'config/config.service';
import { DatabaseService } from 'common/database.service';
import { ExceptionFilter } from 'errors/exception.filter';
import { LoggerService } from 'logger/logger.service';
import { TYPES } from 'utils/constants';
import { UsersController } from 'controllers/users/users.controller';
import { UsersService } from 'controllers/users/users.service';
import { UsersRepository } from 'controllers/users/users.repository';

import { IExceptionFilter } from 'interface/exception.filter.interface';
import { ILogger } from 'interface/logger.interface';
import { IUsersController } from 'interface/users.controller.interface';
import { IUsersService } from 'interface/users.service.interface';
import { IConfigService } from 'interface/config.service.interface';
import { IUsersRepository } from 'interface/users.repository.interface';

export const appContainer = new Container();

export const appBindings = new ContainerModule(() => {
  appContainer.bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
  appContainer.bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
  appContainer.bind<IUsersController>(TYPES.UsersController).to(UsersController);
  appContainer.bind<IUsersService>(TYPES.UsersService).to(UsersService);
  appContainer.bind<DatabaseService>(TYPES.DatabaseService).to(DatabaseService).inSingletonScope();
  appContainer.bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
  appContainer.bind<IUsersRepository>(TYPES.UsersRepository).to(UsersRepository).inSingletonScope();
  appContainer.bind<App>(TYPES.App).to(App);
});
