import { NextFunction, Router, Request, Response } from 'express';

export interface IControllerRoute {
  func: (req: Request, res: Response, next: NextFunction) => void;
  method: keyof Pick<Router, 'get' | 'post' | 'put' | 'patch' | 'delete'>;
  path: string;
}
