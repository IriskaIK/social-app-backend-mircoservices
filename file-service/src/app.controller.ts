import {Controller, Get, Param, UploadedFile, UseInterceptors} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {

  }


}
