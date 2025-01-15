import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ConfigService} from "@nestjs/config";
import {RpcExceptionFilter} from "src/filters/rcp-exception.filter";
import * as cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)


  app.useGlobalFilters(new RpcExceptionFilter());
  app.use(cookieParser());

  const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('API Gateway')
      .setDescription('Endpoints provided by the API Gateway.')
      .setVersion('1.0')
      .addTag('API Gateway')
      .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(configService.get('port'));
}
bootstrap();
