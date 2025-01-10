import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {Transport} from "@nestjs/microservices";
import {HttpExceptionFilter} from "src/filters/http-exception.filter";


async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: "127.0.0.1",
      port: process.env.PORT
    }
  });

  app.useGlobalFilters(new HttpExceptionFilter());
  app.listen();
}
bootstrap();
