import { NestFactory } from '@nestjs/core';
import { LogLevel, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const logLevel = (process.env.LOG_LEVEL || 'log').split(',').map((lv) => lv.toLowerCase() as LogLevel);

  const app = await NestFactory.create(AppModule, {
    logger: logLevel
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(3000);
}
bootstrap();
