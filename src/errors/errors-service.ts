import { Request, Response, NextFunction } from 'express';
import { LoggerService } from '../logger/logger-service';
import { HttpError } from './http-error';

interface IErrorsService {
  catch: (err: Error, req: Request, res: Response, next: NextFunction) => void;
}

export class ErrorsService implements IErrorsService {
  logger: LoggerService;

  constructor(logger: LoggerService) {
    this.logger = logger;
  }

  catch(
    err: Error | HttpError,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (err instanceof HttpError) {
      this.logger.error(`${err.status}: ${err.message}`);

      return res.status(err.status).send({
        error: err.message,
      });
    }

    this.logger.error(`${err.name}: ${err.message}`);

    return res.status(500).send({
      error: err.message,
    });
  }
}
