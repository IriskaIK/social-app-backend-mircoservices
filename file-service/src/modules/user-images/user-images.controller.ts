import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserImagesService } from 'src/modules/user-images/user-images.service';
import { CreateUserImageDto } from 'src/modules/user-images/dto/create-user-image.dto';
import { UpdateUserImageDto } from 'src/modules/user-images/dto/update-user-image.dto';

@Controller()
export class UserImagesController {
  constructor(private readonly userImagesService: UserImagesService) {}

  @MessagePattern('createUserImage')
  create(@Payload() createUserImageDto: CreateUserImageDto) {
    return this.userImagesService.create(createUserImageDto);
  }

  @MessagePattern('findAllUserImages')
  findAll() {
    return this.userImagesService.findAll();
  }

  @MessagePattern('findOneUserImage')
  findOne(@Payload() id: number) {
    return this.userImagesService.findOne(id);
  }

  @MessagePattern('updateUserImage')
  update(@Payload() updateUserImageDto: UpdateUserImageDto) {
    return this.userImagesService.update(updateUserImageDto.id, updateUserImageDto);
  }

  @MessagePattern('removeUserImage')
  remove(@Payload() id: number) {
    return this.userImagesService.remove(id);
  }
}
