import { Module } from '@nestjs/common';
import { WishlistImagesService } from 'src/modules/wishlist-images/wishlist-images.service';
import { WishlistImagesController } from 'src/modules/wishlist-images/wishlist-images.controller';

@Module({
  controllers: [WishlistImagesController],
  providers: [WishlistImagesService],
})
export class WishlistImagesModule {}
