import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

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
        middlewares: [new ValidateMiddleware(UserLoginDto)],
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

    this.created(res, {
      email: result.email,
      name: result.name,
      id: result.id,
    });
  }

  public async login(
    { body }: Request<{}, {}, UserLoginDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const result = await this.usersService.validateUser(body);

    if (!result) {
      return next(new HttpError(STATUS_CODE.UNAUTHORIZED, 'Unauthorized', 'login'));
    }

    // TODO: generate token
    this.ok(res, 'You are logged in successfully!');
  }
}
