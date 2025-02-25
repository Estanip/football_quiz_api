import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as morgan from 'morgan';
import { HttpExceptionFilter } from 'src/common/exceptions/http.exception';
import { ErrorInterceptor } from 'src/common/interceptors/error.interceptor';
import { CsrfMiddleware } from 'src/common/middlewares/csfr.middleware';
import { configureSwagger } from 'src/configuration/swagger.config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  configureSwagger(app);

  app.useGlobalInterceptors(new ErrorInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
  );
  app.use(express.json());
  app.use(cookieParser());
  app.use(new CsrfMiddleware().use);
  app.use(morgan('dev'));

  app.enableCors({
    origin: process.env.CLIENT_ORIGIN,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'x-csrf-token'],
    credentials: true,
  });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  Logger.log(`Port running on port ${port}`);
}
bootstrap();
