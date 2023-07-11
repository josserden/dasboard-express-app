import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';

import { DEFAULT_PORT, ROUTES, TYPES } from 'utils/constants';
import { UsersController } from 'users/users.controller';

import { ILogger } from 'interface/logger.interface';
import { IConfigService } from 'interface/config.service.interface';
import { IExceptionFilter } from 'interface/exception.filter.interface';
import { DatabaseService } from './common/database.service';

@injectable()
export class App {
  app: Express;
  port: number;
  server: Server;

  constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.ExceptionFilter) private exceptionFilter: IExceptionFilter,
    @inject(TYPES.UsersController) private userController: UsersController,
    // @ts-ignore
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.DatabaseService) private databaseService: DatabaseService,
  ) {
    this.app = express();
    this.port = DEFAULT_PORT;
  }

  useMiddlewares(): void {
    this.app.use(express.json());
  }

  useRoutes(): void {
    this.app.use(ROUTES.USERS, this.userController.router);
  }

  useExceptionFilter(): void {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  public async init(): Promise<void> {
    await this.databaseService.connect();

    this.useMiddlewares();
    this.useRoutes();
    this.useExceptionFilter();

    this.server = this.app.listen(this.port, () => {
      this.logger.log(`Listening on port ${this.port}`);
    });
  }
}
