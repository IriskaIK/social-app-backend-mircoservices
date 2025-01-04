import { Module } from '@nestjs/common';
import { ConnectionsService } from 'src/modules/connections/connections.service';
import { ConnectionsController } from 'src/modules/connections/connections.controller';

@Module({
  providers: [ConnectionsService],
  controllers: [ConnectionsController]
})
export class ConnectionsModule {}
