import express, { Express } from "express";
import { Server } from "http";

import { LoggerService } from "logger/logger.service";
import { userRouter } from "logger/users/users";
import { DEFAULT_PORT } from "utils/constants";

import { ILoggerService } from "types/logger.service.types";

export class App {
  app: Express;
  logger: LoggerService;
  port: number;
  server: Server;

  constructor({ logger }: ILoggerService) {
    this.app = express();
    this.port = DEFAULT_PORT;
    this.logger = logger;
  }

  useRoutes() {
    this.app.use("/users", userRouter);
  }

  public async init() {
    this.useRoutes();

    this.server = this.app.listen(this.port, () => {
      this.logger.log(`Listening on port ${this.port}`);
    });
  }
}
