import { Response } from 'express';
import { LoggerService } from '../logger/logger-service';
import { Router } from 'express';
import { IControllerRoute } from './route.interface';

export abstract class BaseController {
  private readonly _router: Router;

  constructor(private logger: LoggerService) {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  public send<T>(res: Response, code: number, message: T) {
    res.type('application/json');
    return res.status(code).json(message);
  }

  public ok<T>(res: Response, message: T) {
    return this.send<T>(res, 200, message);
  }

  public created<T>(res: Response, message: T) {
    return this.send<T>(res, 201, message);
  }

  protected bindRoutes(routes: IControllerRoute[]) {
    routes.forEach((route) => {
      this.logger.log(`Binding route: ${route.method} ${route.path}`);

      this.router[route.method](route.path, route.func);
    });
  }
}
