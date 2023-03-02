import { Request, Response, NextFunction } from 'express';

import { BaseController } from '../common/base-controller';
import { HttpError } from '../errors/http-error';
import { ROUTES } from '../helpers/routes';
import { LoggerService } from '../logger/logger-service';

export class UserController extends BaseController {
  constructor(logger: LoggerService) {
    super(logger);
    this.bindRoutes([
      {
        path: ROUTES.LOGIN,
        method: 'post',
        func: this.login,
      },
      {
        path: ROUTES.REGISTER,
        method: 'post',
        func: this.register,
      },
    ]);
  }

  login = (req: Request, res: Response, next: NextFunction) => {
    next(new HttpError(401, 'Invalid credentials'));
  };

  register = (req: Request, res: Response, next: NextFunction) => {
    this.ok(res, 'Registration successful');
  };
}
