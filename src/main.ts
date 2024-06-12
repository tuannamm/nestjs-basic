import { NestFactory, Reflector } from '@nestjs/core';
import { LogLevel, ValidationPipe, VersioningType } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { JwtAuthGuard } from 'apps/auth/guard/jwt-auth.guard';
import { TransformInterceptor } from 'libs/interceptors/response.interceptor';

async function bootstrap() {
  const logLevel = (process.env.LOG_LEVEL || 'log').split(',').map((lv) => lv.toLowerCase() as LogLevel);

  const app = await NestFactory.create(AppModule, {
    logger: logLevel
  });

  app.enableCors({
    origin: true,
    methods: 'GET, POST, PUT, DELETE, PATCH',
    credentials: true
  });

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI, // them vao chu v
    defaultVersion: ['1', '2']
  });

  app.use(cookieParser());
  app.useGlobalInterceptors(new TransformInterceptor(app.get(Reflector)));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector)));

  await app.listen(8080);
}
bootstrap();
