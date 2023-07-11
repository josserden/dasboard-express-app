import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { sign } from 'jsonwebtoken';

import { BaseController } from 'common/base.controller';
import { HttpError } from 'errors/http-error';
import { ROUTES, STATUS_CODE, TYPES } from 'utils/constants';
import { UserLoginDto } from 'users/dto/user-login.dto';
import { UserRegisterDto } from 'users/dto/user-register.dto';
import { ValidateMiddleware } from 'common/validate.middleware';

import { ILogger } from 'interface/logger.interface';
import { IUsersController } from 'interface/users.controller.interface';
import { IUsersService } from 'interface/users.service.interface';
import { IConfigService } from 'interface/config.service.interface';
import { AuthGuard } from 'common/auth.guard';

@injectable()
export class UsersController extends BaseController implements IUsersController {
  constructor(
    @inject(TYPES.ILogger) logger: ILogger,
    @inject(TYPES.UsersService) private usersService: IUsersService,
    @inject(TYPES.ConfigService) private configService: IConfigService,
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
      {
        method: 'get',
        path: ROUTES.INFO,
        func: this.info,
        middlewares: [new AuthGuard()],
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
    const secret = this.configService.get('SECRET');

    if (!result) {
      return next(new HttpError(STATUS_CODE.UNAUTHORIZED, 'Unauthorized', 'login'));
    }

    const token = await this.signToken(body.email, secret);

    this.ok(res, token);
  }

  async info({ user }: Request, res: Response, next: NextFunction): Promise<void> {
    const userInfo = await this.usersService.getUserInfo(user);

    this.ok(res, { email: userInfo?.email, name: userInfo?.name, id: userInfo?.id });
  }

  private signToken(email: string, secret: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      sign(
        {
          email,
          iat: new Date().getTime(),
        },
        secret,
        {
          algorithm: 'HS256',
        },
        (err, token): void => {
          if (err) {
            return reject(err);
          }

          return resolve(token as string);
        },
      );
    });
  }
}
