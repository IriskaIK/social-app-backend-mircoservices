import { Test, TestingModule } from '@nestjs/testing';
import { UserImagesController } from 'src/modules/user-images/user-images.controller';
import { UserImagesService } from 'src/modules/user-images/user-images.service';

describe('UserImagesController', () => {
  let controller: UserImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserImagesController],
      providers: [UserImagesService],
    }).compile();

    controller = module.get<UserImagesController>(UserImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
