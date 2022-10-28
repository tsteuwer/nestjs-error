import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    bodyParser.json({
      type: 'application/vnd.api+json',
    })
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true
    })
  );

  await app.listen(4000);
}
bootstrap();
