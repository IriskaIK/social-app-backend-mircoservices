import { Injectable } from '@nestjs/common';
import { CreateUserImageDto } from 'src/modules/user-images/dto/create-user-image.dto';
import { UpdateUserImageDto } from 'src/modules/user-images/dto/update-user-image.dto';

@Injectable()
export class UserImagesService {
  create(createUserImageDto: CreateUserImageDto) {
    return 'This action adds a new userImage';
  }

  findAll() {
    return `This action returns all userImages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userImage`;
  }

  update(id: number, updateUserImageDto: UpdateUserImageDto) {
    return `This action updates a #${id} userImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} userImage`;
  }
}
