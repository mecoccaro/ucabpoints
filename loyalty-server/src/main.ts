import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import * as requestIp from 'request-ip';

import { AppModule } from './app/app.module';

import configService from './config/modules/config.service';
import { AllExceptionsFilter } from './exceptions-filter/all-exceptions.filter';
import { AppLoggerService } from './logger/app-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //const app = await NestFactory.create(AppModule, {
  //  logger: false,
  //});

  app.useLogger(new AppLoggerService());

  app.setGlobalPrefix('api');

  app.use(cookieParser(configService.get('SECRET')));

  app.use(helmet());

  app.useGlobalFilters(new AllExceptionsFilter(new AppLoggerService()));

  const options = new DocumentBuilder()
    .setTitle('Loyalty Points API')
    .setDescription('Back-end for Loyalty Points')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const corsOptions: import('@nestjs/common/interfaces/external/cors-options.interface').CorsOptions = {
    credentials: true,
    origin: configService.get('FRONTEND_URL'),
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 200,
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
    ],
  };

  app.enableCors(corsOptions);

  app.use(requestIp.mw());

  await app.listen(configService.get('PORT'));
}
bootstrap();
