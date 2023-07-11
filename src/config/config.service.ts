import { inject, injectable } from 'inversify';
import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';

import { TYPES } from 'utils/constants';

import { IConfigService } from 'interface/config.service.interface';
import { ILogger } from 'interface/logger.interface';

@injectable()
export class ConfigService implements IConfigService {
  private config: DotenvParseOutput;

  constructor(@inject(TYPES.ILogger) private logger: ILogger) {
    const result: DotenvConfigOutput = config();

    if (result.error) {
      this.logger.error('[ConfigService]: Error reading .env file or env variables are not set');
      return;
    }

    this.logger.log('[ConfigService]: Configuration .env loaded');
    this.config = result.parsed as DotenvParseOutput;
  }

  get<T extends string | number>(key: string): T {
    return this.config[key] as T;
  }
}
