import { Logger, ISettingsParam, ILogObj } from 'tslog';

const loggerSettings = {
  displayInstanceName: false,
  displayLoggerName: false,
  displayFilePath: 'hidden',
  displayFunctionName: false,
} as ISettingsParam<ILogObj>;

export class LoggerService {
  public logger: Logger<ILogObj>;

  constructor() {
    this.logger = new Logger(loggerSettings);
  }

  log(...args: unknown[]) {
    this.logger.info(...args);
  }

  error(...args: unknown[]) {
    this.logger.error(...args);
  }

  warn(...args: unknown[]) {
    this.logger.warn(...args);
  }
}
