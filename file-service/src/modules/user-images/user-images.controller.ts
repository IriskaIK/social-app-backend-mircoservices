import { Controller } from '@nestjs/common';
import {EventPattern, MessagePattern, Payload} from '@nestjs/microservices';
import { UserImagesService } from 'src/modules/user-images/user-images.service';
import { CreateUserImageDto } from 'src/modules/user-images/dto/create-user-image.dto';
import { UpdateUserImageDto } from 'src/modules/user-images/dto/update-user-image.dto';

@Controller()
export class UserImagesController {
  constructor(private readonly userImagesService: UserImagesService) {}

  @EventPattern('upload_profile_image')
  async uploadImage(@Payload() payload: CreateUserImageDto) {
    return await this.userImagesService.uploadImage(payload);
  }

  @MessagePattern({cmd : 'get_profile_image'})
  findOne(@Payload() payload : {owner_id: string}) {
    return this.userImagesService.findOne(payload.owner_id);
  }

  @EventPattern('remove_profile_image')
  removeImageByID(@Payload() payload : {owner_id: string}) {
    return this.userImagesService.remove(payload.owner_id)
  }

}
