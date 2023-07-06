import { NextFunction, Request, Response } from "express";
import { BaseController } from "common/base.controller";
import { LoggerService } from "logger/logger.service";
import { ROUTES } from "utils/constants";
import { HttpError } from "errors/http-error";

export class UsersController extends BaseController {
  constructor(logger: LoggerService) {
    super(logger);

    this.bindRoutes([
      {
        method: "post",
        path: ROUTES.REGISTER,
        func: this.register,
      },
      {
        method: "post",
        path: ROUTES.LOGIN,
        func: this.login,
      },
    ]);
  }

  public register(req: Request, res: Response, next: NextFunction) {
    next(new HttpError(401, "Unauthorized", "register"));
  }

  public login(req: Request, res: Response, next: NextFunction) {
    this.ok(res, "login");
  }
}
