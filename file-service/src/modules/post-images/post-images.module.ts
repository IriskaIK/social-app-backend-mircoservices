import { Module } from '@nestjs/common';
import { PostImagesService } from 'src/modules/post-images/post-images.service';
import { PostImagesController } from 'src/modules/post-images/post-images.controller';

@Module({
  controllers: [PostImagesController],
  providers: [PostImagesService],
})
export class PostImagesModule {}
