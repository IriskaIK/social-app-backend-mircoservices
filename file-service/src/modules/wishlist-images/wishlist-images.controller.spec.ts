import { Test, TestingModule } from '@nestjs/testing';
import { WishlistImagesController } from 'src/modules/wishlist-images/wishlist-images.controller';
import { WishlistImagesService } from 'src/modules/wishlist-images/wishlist-images.service';

describe('WishlistImagesController', () => {
  let controller: WishlistImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WishlistImagesController],
      providers: [WishlistImagesService],
    }).compile();

    controller = module.get<WishlistImagesController>(WishlistImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
