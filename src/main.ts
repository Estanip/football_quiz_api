import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from 'src/common/exceptions/http.exception';
import { ErrorInterceptor } from 'src/common/interceptors/error.interceptor';
import { CsrfMiddleware } from 'src/common/middlewares/csfr.middleware';
import { configureSwagger } from 'src/configuration/swagger.config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  configureSwagger(app);

  // TODO: improve CORS settings
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: '*',
  });

  app.useGlobalInterceptors(new ErrorInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
  );
  app.use(cookieParser());
  app.use(new CsrfMiddleware().use);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  Logger.log(`Port running on port ${port}`);
}
bootstrap();
