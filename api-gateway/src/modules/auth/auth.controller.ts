import {Body, Controller, Get, Post, Req, Res, UseGuards} from '@nestjs/common';
import {UserCredentials} from "src/interfaces/UserCredentials";
import {AuthService} from "src/modules/auth/auth.service";
import {AuthGuard} from "src/guards/auth.guard";
import {Request, Response} from "express";


@Controller('auth')
export class AuthController {
    constructor(private readonly appService: AuthService) {
    }

    @Post('/login')
    loginUser(@Body() data: { email: string; password: string }, @Res({passthrough: true}) response: Response) {
        return this.appService.loginUser(data, response)
    }

    @Post('/register')
    registerUser(@Body() data: UserCredentials, @Res({passthrough: true}) response: Response) {
        return this.appService.registerUser(data, response)
    }


    @UseGuards(AuthGuard)
    @Get('/logout')
    logoutUser(@Req() request: Request, @Res({passthrough: true}) response: Response) {
        return this.appService.logoutUser(request, response)
    }


    @Get('/refresh')
    refreshUser(@Req() request: Request, @Res({passthrough: true}) response: Response) {
        return this.appService.refreshTokens(request, response)
    }


    @Get("/check-auth")
    pingServiceA() {
        return this.appService.checkAuthServiceHealth();
    }


}
