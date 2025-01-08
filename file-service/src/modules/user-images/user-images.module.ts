import { Module } from '@nestjs/common';
import { UserImagesService } from 'src/modules/user-images/user-images.service';
import { UserImagesController } from 'src/modules/user-images/user-images.controller';

@Module({
  controllers: [UserImagesController],
  providers: [UserImagesService],
})
export class UserImagesModule {}
