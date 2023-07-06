import { NextFunction, Request, Response } from "express";
import { BaseController } from "common/base.controller";
import { LoggerService } from "logger/logger.service";
import { ROUTES } from "utils/constants";

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
    if (!req.body?.username || !req.body?.password) {
      next(new Error("Missing username or password"));

      return;
    }

    return this.created(res, "register");
  }

  public login(req: Request, res: Response, next: NextFunction) {
    if (!req.body?.username || !req.body?.password) {
      next(new Error("Missing username or password"));

      return;
    }

    return this.ok(res, "login");
  }
}
