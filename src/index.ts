import { App } from "./app";
import { LoggerService } from "./logger/logger.service";

const bootstrap = async () => {
  const logger = new LoggerService();

  const app = new App({ logger });

  await app.init();
};

bootstrap();
