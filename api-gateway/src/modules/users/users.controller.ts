import {
    Body,
    Controller, Delete, FileTypeValidator,
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
import {AuthGuard} from "src/guards/auth.guard";
import { Request } from 'express';
import {FileInterceptor} from "@nestjs/platform-express";
import {ClientProxy} from "@nestjs/microservices";
import {UpdateUserDto} from "src/modules/users/dto/update-user.dto";
import {UserShortProfileInfoDto} from "src/modules/users/dto/user-short-profile-info.dto";
import {UserFullProfileIntoDto} from "src/modules/users/dto/user-full-profile-into.dto";
import {ApiBearerAuth, ApiOkResponse} from "@nestjs/swagger";

@Controller('users')
export class UsersController {
    constructor(private readonly appService: UsersService) {}

    @ApiOkResponse({description: 'User found', type : UserShortProfileInfoDto})
    @Get(':id')
    async getUserById(@Param('id') id: string, @Req() req : Request) : Promise<UserShortProfileInfoDto> {
        return this.appService.getUserById(id, {excludeEmail : true, excludeBirthDate : true});
    }

    @ApiOkResponse({description: 'User found', type : [UserShortProfileInfoDto]})
    @Post('/users')
    async getUsersById(@Body() data : { userIds : string[] }) : Promise<UserShortProfileInfoDto[]> {
        return this.appService.getUsersByIds(data.userIds)
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get()
    async getUserByReq(@Req() req : Request): Promise<UserFullProfileIntoDto> {
        return this.appService.getUserById(req.user.id, {excludeEmail : false, excludeBirthDate : false})
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Put('')
    async updateUser(@Body() data: UpdateUserDto, @Req() req: Request) {
        return this.appService.updateUserById(data, req);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
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
        ) file: Express.Multer.File, @Req() req : Request
    ){
        return await this.appService.uploadProfileImage(file.originalname, file.buffer, req.user.id, req)
    }

    @Get('/profile-image/:id')
    async getProfileImage(@Param('id') id: string, @Req() req : Request) {
        return this.appService.getProfileImage(id)
    }


    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Delete('/profile-image/')
    async removeProfileImage(@Req() req : Request) {
        return this.appService.removeProfileImage(req.user.id)
    }

}
