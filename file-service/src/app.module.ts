import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from '@nestjs/config';
import { S3Service } from './s3/s3.service';
import { PostImagesModule } from './modules/post-images/post-images.module';
import { UserImagesModule } from './modules/user-images/user-images.module';
import { WishlistImagesModule } from './modules/wishlist-images/wishlist-images.module';
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
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
    PostImagesModule,
    UserImagesModule,
    WishlistImagesModule,
  ],
  controllers: [AppController],
  providers: [AppService, S3Service],
})
export class AppModule {}
