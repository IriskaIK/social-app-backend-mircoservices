import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {JwtModule} from '@nestjs/jwt';
import {ConfigModule} from '@nestjs/config';
import {CacheModule} from "@nestjs/cache-manager";
import { redisStore } from 'cache-manager-redis-yet';
import {CacheStore} from "@nestjs/common/cache";


@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        JwtModule.register({}),
        CacheModule.registerAsync({
            useFactory: async () => {
                const store = await redisStore({
                    socket: {
                        host: process.env.REDIS_HOST,
                        port: +process.env.REDIS_PORT,
                    },
                });

                return {
                    store: store as unknown as CacheStore,
                };
            },
        }),

    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
