import { Test, TestingModule } from '@nestjs/testing';
import { WishlistImagesService } from 'src/modules/wishlist-images/wishlist-images.service';

describe('WishlistImagesService', () => {
  let service: WishlistImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WishlistImagesService],
    }).compile();

    service = module.get<WishlistImagesService>(WishlistImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
