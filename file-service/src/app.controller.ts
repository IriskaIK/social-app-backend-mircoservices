import {Controller, Get, Param, UploadedFile, UseInterceptors} from '@nestjs/common';
import { AppService } from './app.service';
import {FileInterceptor} from "@nestjs/platform-express";
import {MessagePattern, Payload} from "@nestjs/microservices";
@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {

  }

  @MessagePattern({cmd : "upload_file"})
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@Payload() data: { file: Express.Multer.File }) {
    return this.appService.uploadFile(data.file.buffer, data.file.originalname);
  }


  @MessagePattern({cmd : "get_profile_images"})
  async getProfileImage(@Payload() data : {image_ids : string[]}){

  }

  @MessagePattern({cmd : "get_post_images"})
  async getPostImages(@Payload() data : {image_ids: string[]}){

  }

  @MessagePattern({cmd : "get_signed_url"})
  async getSignedUrl(@Payload() data: { key: string }) {
    return this.appService.getSignedUrl(data.key);
  }


}
