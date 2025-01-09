import { Module } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { UsersController } from 'src/modules/users/users.controller';
import {ConfigModule} from "@nestjs/config";
import {config} from "src/config/config";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {AuthModule} from "src/modules/auth/auth.module";
import {AuthGuard} from "src/guards/auth.guard";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    ClientsModule.register([
      {
        name: "USER_SERVICE",
        transport: Transport.TCP,
        options: {
          host: "127.0.0.1",
          port: +process.env.USER_SERVICE_PORT
        }
      },
      {
        name: "TOKEN_SERVICE",
        transport: Transport.TCP,
        options: {
          host: "127.0.0.1",
          port: +process.env.TOKEN_SERVICE_PORT
        }
      },
      {
        name : "FILE_SERVICE",
        transport: Transport.TCP,
        options: {
          host: "127.0.0.1",
          port: +process.env.FILE_SERVICE_PORT
        }
      }

    ]),
  ],
  providers: [UsersService, AuthGuard],
  controllers: [UsersController]
})
export class UsersModule {}
