import { NextFunction, Router, Request, Response } from 'express';
import { IMiddleware } from 'interface/middleware.interface';

export interface IControllerRoute {
  func: (req: Request, res: Response, next: NextFunction) => void;
  method: keyof Pick<Router, 'get' | 'post' | 'put' | 'patch' | 'delete'>;
  middlewares?: IMiddleware[];
  path: string;
}
