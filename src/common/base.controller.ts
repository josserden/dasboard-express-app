import { Router, Response } from "express";
import { LoggerService } from "../logger/logger.service";

import { IControllerRoute } from "./types";

export abstract class BaseController {
  private readonly _router: Router;

  constructor(private logger: LoggerService) {
    this._router = Router();
  }

  get router(): Router {
    return this._router;
  }

  public send<T>(res: Response, code: number, message: T) {
    res.type("application/json");

    return res.status(code).send(message);
  }

  public ok<T>(res: Response, message: T) {
    return this.send(res, 200, message);
  }

  public created<T>(res: Response, message: T) {
    return this.send(res, 201, message);
  }

  protected bindRoutes(routes: IControllerRoute[]) {
    routes.forEach(({ method, func, path }) => {
      this.logger.log(`Binding route ${method} ${path}`);

      const routeFunc = func.bind(this);
      this.router[method](path, routeFunc);
    });
  }
}
