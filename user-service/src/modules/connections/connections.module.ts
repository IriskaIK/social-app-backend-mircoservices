import { Module } from '@nestjs/common';
import { ConnectionsService } from 'src/modules/connections/connections.service';
import { ConnectionsController } from 'src/modules/connections/connections.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "src/entities/user.entity";
import {Connection} from "src/entities/connection.entity";
import {ConnectionStatus} from "src/entities/connection_status.entity";

@Module({
  imports : [TypeOrmModule.forFeature([Connection, ConnectionStatus])],
  providers: [ConnectionsService],
  controllers: [ConnectionsController]
})
export class ConnectionsModule {}
