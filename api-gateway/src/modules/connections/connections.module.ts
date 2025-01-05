import {Module} from '@nestjs/common';
import {ConnectionsService} from 'src/modules/connections/connections.service';
import {ConnectionsController} from 'src/modules/connections/connections.controller';
import {ConfigModule} from "@nestjs/config";
import {config} from "src/config/config";
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
    imports: [ConfigModule.forRoot({
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

        ]),
    ],
    providers: [ConnectionsService],
    controllers: [ConnectionsController]
})
export class ConnectionsModule {
}
