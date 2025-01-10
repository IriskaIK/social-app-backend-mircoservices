import { PartialType } from '@nestjs/mapped-types';
import { CreateWishlistImageDto } from 'src/modules/wishlist-images/dto/create-wishlist-image.dto';

export class UpdateWishlistImageDto extends PartialType(CreateWishlistImageDto) {
  id: number;
}
