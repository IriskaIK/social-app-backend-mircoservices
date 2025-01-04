import {
    ArgumentsHost,
    Body,
    Catch,
    Controller,
    Get,
    Post,
    RpcExceptionFilter,
    UseFilters,
    UseGuards
} from '@nestjs/common';
import {AppService} from './app.service';
import {AuthGuard} from "src/guards/auth.guard";


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
