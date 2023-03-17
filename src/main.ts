import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Epicure')
    .setDescription('Epicure Api Description')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, document);

  const getError = (error: ValidationError): string => {
    return error.constraints
      ? Object.values(error.constraints)[0]
      : error.property + '.' + getError(error.children[0]);
  };

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(getError(validationErrors[0]));
      },
    }),
  );

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
