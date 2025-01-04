import { Module } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { AuthController } from 'src/modules/auth/auth.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "src/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
