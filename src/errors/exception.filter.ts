import { NextFunction, Response, Request } from "express";
import { inject, injectable } from "inversify";

import { HttpError } from "errors/http-error";
import { TYPES } from "utils/constants";

import { IExceptionFilter } from "interface/exception.filter.interface";
import { ILogger } from "interface/logger.interface";

@injectable()
export class ExceptionFilter implements IExceptionFilter {
  constructor(@inject(TYPES.ILogger) private logger: ILogger) {}

  catch(
    err: Error | HttpError,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (err instanceof HttpError) {
      this.logger.error(`[${err.context}] ${err.statusCode}: ${err.message}`);

      res.status(err.statusCode).send({
        error: err.message,
      });

      return;
    }

    this.logger.error(err.message);

    res.status(500).send({
      error: err.message,
    });
  }
}
