import {
    Body,
    Controller, FileTypeValidator,
    Get, Inject, MaxFileSizeValidator,
    Param,
    ParseFilePipe,
    Post,
    Put,
    Req,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {UsersService} from "src/modules/users/users.service";
import {UserDTO} from "src/interfaces/UserDTO";
import {AuthGuard} from "src/guards/auth.guard";
import { Request } from 'express';
import {FileInterceptor} from "@nestjs/platform-express";
import {ClientProxy} from "@nestjs/microservices";

@Controller('users')
export class UsersController {
    constructor(private readonly appService: UsersService) {}


    @Get(':id')
    async getUserById(@Param('id') id: string, @Req() req : Request) {
        return this.appService.getUserById(id, {excludeEmail : true, excludeBirthDate : true});
    }

    @Post('/users')
    async getUsersById(@Body() data : { userIds : string[] }) {
        return this.appService.getUsersByIds(data.userIds)
    }

    @UseGuards(AuthGuard)
    @Get()
    async getUserByReq(@Req() req : Request) {
        return this.appService.getUserById(req.user.id, {excludeEmail : false, excludeBirthDate : false})
    }

    @UseGuards(AuthGuard)
    @Put('')
    async updateUser(@Body() data: UserDTO, @Req() req: Request) {
        return this.appService.updateUserById(data, req);
    }


    @Post('/profile-image')
    @UseInterceptors(FileInterceptor('file'))
    async uploadProfileImage(
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({maxSize: 2000000}),
                    new FileTypeValidator({fileType : 'image/'})
                ]
            })
        ) file: Express.Multer.File
    ){
        return await this.appService.uploadProfileImage(file.originalname, file.buffer)
    }

    @Get('/profile-image/:id')
    async getProfileImage(@Param('id') id: string, @Req() req : Request) {
        return this.appService.getProfileImage(id)
    }
}
