import { App } from "app";
import { LoggerService } from "logger/logger.service";
import { UsersController } from "users/users.controller";

const bootstrap = async () => {
  const logger = new LoggerService();
  const userController = new UsersController(logger);

  const app = new App({ logger }, userController);

  await app.init();
};

bootstrap();
