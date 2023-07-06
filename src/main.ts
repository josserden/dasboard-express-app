import { App } from "app";
import { LoggerService } from "logger/logger.service";
import { UsersController } from "users/users.controller";
import { ExceptionFilter } from "./errors/exception.filter";

const bootstrap = async () => {
  const logger = new LoggerService();
  const userController = new UsersController(logger);
  const exceptionFilter = new ExceptionFilter(logger);

  const app = new App({ logger }, userController, exceptionFilter);

  await app.init();
};

bootstrap();
