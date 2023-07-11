import { Container, ContainerModule } from 'inversify';

import { App } from 'app';
import { ConfigService } from 'config/config.service';
import { ExceptionFilter } from 'errors/exception.filter';
import { LoggerService } from 'logger/logger.service';
import { TYPES } from 'utils/constants';
import { UsersController } from 'users/users.controller';
import { UsersService } from 'users/users.service';

import { IExceptionFilter } from 'interface/exception.filter.interface';
import { ILogger } from 'interface/logger.interface';
import { IUsersController } from 'interface/users.controller.interface';
import { IUsersService } from 'interface/users.service.interface';
import { IConfigService } from 'interface/config.service.interface';

export const appContainer = new Container();

export const appBindings = new ContainerModule(() => {
  appContainer.bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
  appContainer.bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
  appContainer.bind<IUsersController>(TYPES.UsersController).to(UsersController);
  appContainer.bind<IUsersService>(TYPES.UsersService).to(UsersService);
  appContainer.bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
  appContainer.bind<App>(TYPES.App).to(App);
});
