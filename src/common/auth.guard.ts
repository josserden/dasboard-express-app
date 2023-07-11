import { NextFunction, Response, Request } from 'express';
import { IMiddleware } from 'interface/middleware.interface';
import { STATUS_CODE } from 'utils/constants';

export class AuthGuard implements IMiddleware {
  execute(req: Request, res: Response, next: NextFunction): void {
    if (!req.user) {
      res.status(STATUS_CODE.UNAUTHORIZED).json({ message: 'Unauthorized' });

      return;
    }

    next();
  }
}
