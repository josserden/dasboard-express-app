import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';

import { TYPES } from 'utils/constants';

import { ILogger } from 'interface/logger.interface';

@injectable()
export class DatabaseService {
  client: PrismaClient;

  constructor(@inject(TYPES.ILogger) private logger: ILogger) {
    this.client = new PrismaClient();
  }

  async connect(): Promise<void> {
    try {
      await this.client.$connect();

      this.logger.log('[DatabaseService]: Database connected');
    } catch (e) {
      if (e instanceof Error) {
        this.logger.error(`[DatabaseService]: ${e.message}`);
      }
    }
  }

  async disconnect(): Promise<void> {
    await this.client.$disconnect();

    this.logger.log('[DatabaseService]: Database disconnected');
  }
}
