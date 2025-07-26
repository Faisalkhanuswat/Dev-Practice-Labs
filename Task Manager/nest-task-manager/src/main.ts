import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { Logger } from '@nestjs/common';
import { corsOptions } from './config/policy.config';
import configuration from './config/yaml.config'

async function bootstrap() {
  const { http } = configuration();
  const port = http.port ?? 3000

  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.enableCors(corsOptions);
  app.use(helmet());

  await app.listen(port, () => {
    Logger.log(`Server is runnig on ${port}`, 'Bootstrap');
  });
}
bootstrap();
