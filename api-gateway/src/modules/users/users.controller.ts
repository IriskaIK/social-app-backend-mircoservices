import {Body, Controller, Get, Param, Post, Put, Req, UseGuards} from '@nestjs/common';
import {UsersService} from "src/modules/users/users.service";
import {UserDTO} from "src/interfaces/UserDTO";
import {AuthGuard} from "src/guards/auth.guard";
import { Request } from 'express';

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
}
