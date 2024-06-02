import { NestFactory, Reflector } from '@nestjs/core';
import { LogLevel, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { JwtAuthGuard } from 'apps/auth/guard/jwt-auth.guard';

async function bootstrap() {
  const logLevel = (process.env.LOG_LEVEL || 'log').split(',').map((lv) => lv.toLowerCase() as LogLevel);

  const app = await NestFactory.create(AppModule, {
    logger: logLevel
  });
  app.enableCors({
    origin: '*',
    methods: 'GET, POST, PUT, DELETE, PATCH'
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector)));
  await app.listen(3000);
}
bootstrap();
