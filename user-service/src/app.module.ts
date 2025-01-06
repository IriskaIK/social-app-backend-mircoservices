import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule} from '@nestjs/config';
import {UserModule} from './modules/user/user.module';
import {AppController} from "src/app.controller";
import {AppService} from "src/app.service";
import { AuthModule } from './modules/auth/auth.module';
import { ConnectionsModule } from './modules/connections/connections.module';

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}), // Load environment variables
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DATABASE_HOST || 'localhost',
            port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
            username: process.env.DATABASE_USERNAME || 'postgres',
            password: process.env.DATABASE_PASSWORD || 'postgres',
            database: process.env.DATABASE_NAME || 'test_nest_db',
            autoLoadEntities: true,
            synchronize: true, // Use only for development
        }),
        UserModule,
        AuthModule,
        ConnectionsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
