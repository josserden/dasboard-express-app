import express, { Express } from "express";
import { Server } from "http";

import { UsersController } from "users/users.controller";
import { DEFAULT_PORT, ROUTES } from "utils/constants";
import { ExceptionFilter } from "errors/exception.filter";

import { ILoggerService } from "interface/logger.service.interface";
import { ILogger } from "interface/logger.interface";

export class App {
  app: Express;
  logger: ILogger;
  port: number;
  server: Server;
  userController: UsersController;
  exceptionFilter: ExceptionFilter;

  constructor(
    { logger }: ILoggerService,
    userController: UsersController,
    exceptionFilter: ExceptionFilter
  ) {
    this.app = express();
    this.port = DEFAULT_PORT;
    this.logger = logger;
    this.userController = userController;
    this.exceptionFilter = exceptionFilter;
  }

  useRoutes() {
    this.app.use(ROUTES.USERS, this.userController.router);
  }

  useExceptionFilter() {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  public async init() {
    this.useRoutes();
    this.useExceptionFilter();

    this.server = this.app.listen(this.port, () => {
      this.logger.log(`Listening on port ${this.port}`);
    });
  }
}
