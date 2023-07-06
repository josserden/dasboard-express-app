import { Container, ContainerModule, interfaces } from "inversify";

import { App } from "app";
import { ExceptionFilter } from "errors/exception.filter";
import { LoggerService } from "logger/logger.service";
import { UsersController } from "users/users.controller";
import { TYPES } from "utils/constants";

import { IExceptionFilter } from "interface/exception.filter.interface";
import { ILogger } from "interface/logger.interface";
import { IUsersController } from "interface/users.controller.interface";

export const appContainer = new Container();

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  appContainer.bind<ILogger>(TYPES.ILogger).to(LoggerService);
  appContainer
    .bind<IUsersController>(TYPES.UsersController)
    .to(UsersController);
  appContainer
    .bind<IExceptionFilter>(TYPES.ExceptionFilter)
    .to(ExceptionFilter);
  appContainer.bind<App>(TYPES.App).to(App);
});
