import { NextFunction, Request, Response } from 'express';
import { verify, JwtPayload } from 'jsonwebtoken';

import { IMiddleware } from 'interface/middleware.interface';

export class AuthMiddleware implements IMiddleware {
  constructor(private secret: string) {}

  execute(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers.authorization;

    if (!token) return next();

    verify(
      token,
      this.secret,
      (err: Error | null, payload: JwtPayload | string | undefined): void => {
        if (err) return next();

        if (typeof payload !== 'string') {
          req.user = payload?.email;
        }

        next();
      },
    );
  }
}
