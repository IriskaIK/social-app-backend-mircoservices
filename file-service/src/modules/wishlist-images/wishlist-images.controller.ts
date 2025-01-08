import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { WishlistImagesService } from 'src/modules/wishlist-images/wishlist-images.service';
import { CreateWishlistImageDto } from 'src/modules/wishlist-images/dto/create-wishlist-image.dto';
import { UpdateWishlistImageDto } from 'src/modules/wishlist-images/dto/update-wishlist-image.dto';

@Controller()
export class WishlistImagesController {
  constructor(private readonly wishlistImagesService: WishlistImagesService) {}

  @MessagePattern('createWishlistImage')
  create(@Payload() createWishlistImageDto: CreateWishlistImageDto) {
    return this.wishlistImagesService.create(createWishlistImageDto);
  }

  @MessagePattern('findAllWishlistImages')
  findAll() {
    return this.wishlistImagesService.findAll();
  }

  @MessagePattern('findOneWishlistImage')
  findOne(@Payload() id: number) {
    return this.wishlistImagesService.findOne(id);
  }

  @MessagePattern('updateWishlistImage')
  update(@Payload() updateWishlistImageDto: UpdateWishlistImageDto) {
    return this.wishlistImagesService.update(updateWishlistImageDto.id, updateWishlistImageDto);
  }

  @MessagePattern('removeWishlistImage')
  remove(@Payload() id: number) {
    return this.wishlistImagesService.remove(id);
  }
}
