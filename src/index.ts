import { App } from './app';
import { LoggerService } from './logger/logger-service';
import { UserController } from './users/user-controller';

const initApp = async () => {
  const logger = new LoggerService();
  const userController = new UserController(logger);

  const app = new App(logger, userController);

  await app.start();
};

initApp();
