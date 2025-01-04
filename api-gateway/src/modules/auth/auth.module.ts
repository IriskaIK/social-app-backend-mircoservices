import { Module } from '@nestjs/common';
import { AuthController } from 'src/modules/auth/auth.controller';
import { AuthService } from 'src/modules/auth/auth.service';
import {ConfigModule} from "@nestjs/config";
import {config} from "src/config/config";
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load : [config],
    }),
    ClientsModule.register([
      {
        name: "TOKEN_SERVICE",
        transport: Transport.TCP,
        options: {
          host: "127.0.0.1",
          port: +process.env.TOKEN_SERVICE_PORT
        }
      },
      {
        name: "USER_SERVICE",
        transport: Transport.TCP,
        options: {
          host: "127.0.0.1",
          port: +process.env.USER_SERVICE_PORT
        }
      }

    ])
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
