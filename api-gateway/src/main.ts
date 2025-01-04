import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from "node:process";
import {ConfigService} from "@nestjs/config";
import {RpcExceptionFilter} from "src/filters/rcp-exception.filter";
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)

  app.useGlobalFilters(new RpcExceptionFilter());
  app.use(cookieParser());
  await app.listen(configService.get('port'));
}
bootstrap();
