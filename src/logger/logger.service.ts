import { ISettingsParam, Logger } from "tslog";
import { ILogger } from "interface/logger.interface";

export class LoggerService implements ILogger {
  public logger: Logger<unknown>;

  constructor() {
    this.logger = new Logger({
      displayInstanceName: false,
      displayLoggerName: false,
      displayFilePath: "hidden",
      displayFunctionName: false,
    } as ISettingsParam<unknown>);
  }

  log(...args: unknown[]): void {
    this.logger.info(...args);
  }

  error(...args: unknown[]): void {
    this.logger.error(...args);
  }

  warn(...args: unknown[]): void {
    this.logger.warn(...args);
  }
}
