import { inject, injectable } from 'inversify';
import { NextFunction, Request, Response } from 'express';

import { BaseController } from 'common/base.controller';
import { HttpError } from 'errors/http-error';
import { ROUTES, STATUS_CODE, TYPES } from 'utils/constants';
import { UserLoginDto } from 'users/dto/user-login.dto';
import { UserRegisterDto } from 'users/dto/user-register.dto';
import { ValidateMiddleware } from 'common/validateMiddleware';

import { ILogger } from 'interface/logger.interface';
import { IUsersController } from 'interface/users.controller.interface';
import { IUsersService } from 'interface/users.service.interface';

@injectable()
export class UsersController extends BaseController implements IUsersController {
  constructor(
    @inject(TYPES.ILogger) logger: ILogger,
    @inject(TYPES.UsersService) private usersService: IUsersService,
  ) {
    super(logger);

    this.bindRoutes([
      {
        method: 'post',
        path: ROUTES.REGISTER,
        func: this.register,
        middlewares: [new ValidateMiddleware(UserRegisterDto)],
      },
      {
        method: 'post',
        path: ROUTES.LOGIN,
        func: this.login,
      },
    ]);
  }

  public async register(
    { body }: Request<{}, {}, UserRegisterDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const result = await this.usersService.createUser(body);

    if (!result) {
      return next(new HttpError(STATUS_CODE.UNPROCESSABLE_ENTITY, 'User is exist!', 'register'));
    }

    this.ok(res, result);
  }

  public login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): void {
    console.log(req.body);

    this.ok(res, 'login');
    next(new HttpError(STATUS_CODE.UNAUTHORIZED, 'Unauthorized', 'login'));
  }
}
