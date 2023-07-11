import { injectable } from 'inversify';
import { Router, Response } from 'express';

import { STATUS_CODE } from 'utils/constants';

import { IControllerRoute } from 'interface/base.controller.interface';
import { ILogger } from 'interface/logger.interface';

@injectable()
export abstract class BaseController {
  private readonly _router: Router;

  constructor(private logger: ILogger) {
    this._router = Router();
  }

  get router(): Router {
    return this._router;
  }

  public send<T>(res: Response, code: number, message: T): Response<T> {
    res.type('application/json');

    return res.status(code).send(message);
  }

  public ok<T>(res: Response, message: T): Response<T> {
    return this.send(res, STATUS_CODE.SUCCESS, message);
  }

  public created<T>(res: Response, message: T): Response<T> {
    return this.send(res, STATUS_CODE.CREATED, message);
  }

  protected bindRoutes(routes: IControllerRoute[]): void {
    routes.forEach(({ method, func, path, middlewares }) => {
      this.logger.log(`Binding route ${method} ${path}`);

      const middleware = middlewares?.map(m => m.execute.bind(m));
      const routeFunc = func.bind(this);
      const pipeline = middleware ? [...middleware, routeFunc] : routeFunc;

      this.router[method](path, pipeline);
    });
  }
}
