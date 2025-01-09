import { Module } from '@nestjs/common';
import { UserImagesService } from 'src/modules/user-images/user-images.service';
import { UserImagesController } from 'src/modules/user-images/user-images.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserImage} from "src/modules/user-images/entities/user-image.entity";
import {S3Service} from "src/s3/s3.service";

@Module({
  imports : [TypeOrmModule.forFeature([UserImage])],
  controllers: [UserImagesController],
  providers: [UserImagesService, S3Service],
})
export class UserImagesModule {}
