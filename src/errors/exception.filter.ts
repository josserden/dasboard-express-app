import { NextFunction, Response, Request } from "express";
import { LoggerService } from "logger/logger.service";
import { HttpError } from "errors/http-error";

import { IExceptionFilter } from "types/exception.filter.types";

export class ExceptionFilter implements IExceptionFilter {
  logger: LoggerService;

  constructor(logger: LoggerService) {
    this.logger = logger;
    this.logger.warn("ExceptionFilter initialized");
  }

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
