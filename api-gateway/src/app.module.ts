import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule} from "@nestjs/config";
import {config} from "src/config/config";
import {AuthGuard} from "src/guards/auth.guard";
import {UsersModule} from './modules/users/users.module';
import {AuthModule} from './modules/auth/auth.module';
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [config],
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

        ]),
        UsersModule, AuthModule
    ],

    controllers: [AppController],
    providers: [AppService, AuthGuard],
})
export class AppModule {
}
