import { Injectable } from '@nestjs/common';
import { CreateWishlistImageDto } from 'src/modules/wishlist-images/dto/create-wishlist-image.dto';
import { UpdateWishlistImageDto } from 'src/modules/wishlist-images/dto/update-wishlist-image.dto';

@Injectable()
export class WishlistImagesService {
  create(createWishlistImageDto: CreateWishlistImageDto) {
    return 'This action adds a new wishlistImage';
  }

  findAll() {
    return `This action returns all wishlistImages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wishlistImage`;
  }

  update(id: number, updateWishlistImageDto: UpdateWishlistImageDto) {
    return `This action updates a #${id} wishlistImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} wishlistImage`;
  }
}
