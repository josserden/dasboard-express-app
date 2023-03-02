import { App } from './app';
import { ErrorsService } from './errors/errors-service';
import { LoggerService } from './logger/logger-service';
import { UserController } from './users/user-controller';

const initApp = async () => {
  const logger = new LoggerService();
  const userController = new UserController(logger);
  const errorsService = new ErrorsService(logger);

  const app = new App(logger, userController, errorsService);

  await app.start();
};

initApp();
