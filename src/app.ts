import express, { Express } from "express";
import { Server } from "http";

import { LoggerService } from "logger/logger.service";
import { UsersController } from "users/users.controller";
import { DEFAULT_PORT, ROUTES } from "utils/constants";

import { ILoggerService } from "types/logger.service.types";

export class App {
  app: Express;
  logger: LoggerService;
  port: number;
  server: Server;
  userController: UsersController;

  constructor({ logger }: ILoggerService, userController: UsersController) {
    this.app = express();
    this.port = DEFAULT_PORT;
    this.logger = logger;
    this.userController = userController;
  }

  useRoutes() {
    this.app.use(ROUTES.USERS, this.userController.router);
  }

  public async init() {
    this.useRoutes();

    this.server = this.app.listen(this.port, () => {
      this.logger.log(`Listening on port ${this.port}`);
    });
  }
}
