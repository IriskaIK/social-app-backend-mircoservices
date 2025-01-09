import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserImagesService } from 'src/modules/user-images/user-images.service';
import { CreateUserImageDto } from 'src/modules/user-images/dto/create-user-image.dto';
import { UpdateUserImageDto } from 'src/modules/user-images/dto/update-user-image.dto';

@Controller()
export class UserImagesController {
  constructor(private readonly userImagesService: UserImagesService) {}

  @MessagePattern({cmd : 'upload_profile_image'})
  async uploadImage(@Payload() createUserImageDto: CreateUserImageDto) {
    return await this.userImagesService.uploadImage(createUserImageDto);
  }

  @MessagePattern({cmd : 'get_profile_image'})
  findOne(@Payload() id: string) {
    return this.userImagesService.findOne(id);
  }

  @MessagePattern('removeUserImage')
  remove(@Payload() id: number) {
    //TODO: implement
    return this.userImagesService.remove(id);
  }
}
