import { Test, TestingModule } from '@nestjs/testing';
import { UserImagesService } from 'src/modules/user-images/user-images.service';

describe('UserImagesService', () => {
  let service: UserImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserImagesService],
    }).compile();

    service = module.get<UserImagesService>(UserImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
