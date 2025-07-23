import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3000
  app.use(cookieParser());
  app.use(helmet());
  app.enableCors();

  await app.listen(port);
  Logger.log(`Server is runnig on ${port}`, 'Bootstrap')
}
bootstrap();
