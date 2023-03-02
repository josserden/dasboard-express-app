import express, { Express } from 'express';
import { Server } from 'http';
import { ErrorsService } from './errors/errors-service';
import { LoggerService } from './logger/logger-service';
import { UserController } from './users/user-controller';

export class App {
  app: Express;
  port: number;
  server: Server;
  logger: LoggerService;
  userController: UserController;
  errorService: ErrorsService;

  constructor(
    logger: LoggerService,
    userController: UserController,
    errorsService: ErrorsService
  ) {
    this.app = express();
    this.port = 8000;
    this.logger = logger;
    this.userController = userController;
    this.errorService = errorsService;
  }

  useRoutes = () => {
    this.app.use('/users', this.userController.router);
  };

  useHandleErrors = () => {
    this.app.use(this.errorService.catch);
  };

  public start = () => {
    this.useRoutes();

    this.server = this.app.listen(this.port, () => {
      this.logger.log(`Server running at http://localhost:${this.port}`);
    });
  };
}
