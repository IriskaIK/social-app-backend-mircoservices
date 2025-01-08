import { PartialType } from '@nestjs/mapped-types';
import { CreateUserImageDto } from 'src/modules/user-images/dto/create-user-image.dto';

export class UpdateUserImageDto extends PartialType(CreateUserImageDto) {
  id: number;
}
