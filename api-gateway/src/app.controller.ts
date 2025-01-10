import {
    ArgumentsHost,
    Body,
    Catch,
    Controller,
    Get, MaxFileSizeValidator, ParseFilePipe,
    Post,
    RpcExceptionFilter, UploadedFile,
    UseFilters,
    UseGuards, UseInterceptors
} from '@nestjs/common';
import {AppService} from './app.service';
import {AuthGuard} from "src/guards/auth.guard";
import {FileInterceptor} from '@nestjs/platform-express';


@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }


    @UseGuards(AuthGuard)
    @Get()
    getHello(): string {
        return this.appService.getHello();
    }



}
