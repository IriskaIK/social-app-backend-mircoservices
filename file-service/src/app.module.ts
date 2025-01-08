import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from '@nestjs/config';
import { S3Service } from './s3/s3.service';
import { PostImagesModule } from './modules/post-images/post-images.module';
import { UserImagesModule } from './modules/user-images/user-images.module';
import { WishlistImagesModule } from './modules/wishlist-images/wishlist-images.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    PostImagesModule,
    UserImagesModule,
    WishlistImagesModule,
  ],
  controllers: [AppController],
  providers: [AppService, S3Service],
})
export class AppModule {}
