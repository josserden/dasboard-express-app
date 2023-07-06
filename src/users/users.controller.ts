import { inject, injectable } from 'inversify';
import { NextFunction, Request, Response } from 'express';

import { BaseController } from 'common/base.controller';
import { ROUTES, TYPES } from 'utils/constants';
import { HttpError } from 'errors/http-error';

import { ILogger } from 'interface/logger.interface';
import { IUsersController } from 'interface/users.controller.interface';

@injectable()
export class UsersController extends BaseController implements IUsersController {
  constructor(@inject(TYPES.ILogger) logger: ILogger) {
    super(logger);

    this.bindRoutes([
      {
        method: 'post',
        path: ROUTES.REGISTER,
        func: this.register,
      },
      {
        method: 'post',
        path: ROUTES.LOGIN,
        func: this.login,
      },
    ]);
  }

  public register(req: Request, res: Response, next: NextFunction): void {
    next(new HttpError(401, 'Unauthorized', 'register'));
  }

  public login(req: Request, res: Response, next: NextFunction): void {
    this.ok(res, 'login');
  }
}
