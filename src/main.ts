import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser())
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });
  app.setViewEngine('hbs');

  app.use(
    session({
      secret: 'test',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 3600000 }// อายุของคุกกี้เซสชั่น (มิลลิวินาที)
    }),);
  await app.listen(3001);
}
bootstrap();

/* TODO: 
admin side api
search
cors setting
*/