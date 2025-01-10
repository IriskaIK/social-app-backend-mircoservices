import { Controller } from '@nestjs/common';
import { PostImagesService } from 'src/modules/post-images/post-images.service';

@Controller()
export class PostImagesController {
  constructor(private readonly postImagesService: PostImagesService) {}
}
