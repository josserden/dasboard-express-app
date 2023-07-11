import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { ClassConstructor, plainToInstance } from 'class-transformer';

import { STATUS_CODE } from 'utils/constants';

import { IMiddleware } from 'interface/middleware.interface';

export class ValidateMiddleware implements IMiddleware {
  constructor(private classToValidate: ClassConstructor<object>) {}

  execute({ body }: Request, res: Response, next: NextFunction): void {
    const instance = plainToInstance(this.classToValidate, body);

    validate(instance).then(errors => {
      if (errors.length > 0) {
        return res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).send(errors);
      }

      return next();
    });
  }
}
