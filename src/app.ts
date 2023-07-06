import express, { Express } from "express";
import { Server } from "http";

import { LoggerService } from "logger/logger.service";
import { UsersController } from "users/users.controller";
import { DEFAULT_PORT, ROUTES } from "utils/constants";

import { ILoggerService } from "types/logger.service.types";
import { ExceptionFilter } from "./errors/exception.filter";

export class App {
  app: Express;
  logger: LoggerService;
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
