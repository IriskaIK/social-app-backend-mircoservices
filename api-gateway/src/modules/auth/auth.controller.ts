import {Body, Controller, Get, Post, Req, Res, UseGuards} from '@nestjs/common';
import {AuthService} from "src/modules/auth/auth.service";
import {AuthGuard} from "src/guards/auth.guard";
import {Request, Response} from "express";
import {RegisterCredentialsDto} from "src/modules/auth/dto/register-credentials.dto";
import {LoginCredentialsDto} from "src/modules/auth/dto/login-credentials.dto";
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiInternalServerErrorResponse, ApiOkResponse,
    ApiResponse
} from "@nestjs/swagger";
import {UserDetailsDto} from "src/modules/auth/dto/user-details.dto";
import {AuthResponseCredentialsDto} from "src/modules/auth/dto/auth-response-credentials.dto";
import {AuthTokensDto} from "src/modules/auth/dto/auth-tokens.dto";


@Controller('auth')
export class AuthController {
    constructor(private readonly appService: AuthService) {
    }


    @ApiOkResponse({ description: 'User successfully authenticated.', type : AuthResponseCredentialsDto})
    @ApiInternalServerErrorResponse({description: 'Internal Server Error.'}) //TODO: add type?(message whats gone wrong?)
    @ApiBadRequestResponse({description: 'Invalid credentials.'}) // TODO: add type?
    @Post('/login')
    loginUser(@Body() data: LoginCredentialsDto, @Res({passthrough: true}) response: Response) : Promise<AuthResponseCredentialsDto> {
        return this.appService.loginUser(data, response)
    }


    @ApiCreatedResponse({ description: 'User successfully registered.', type : AuthResponseCredentialsDto})
    @ApiBadRequestResponse({description: 'Invalid credentials.'})
    @Post('/register')
    registerUser(@Body() data: RegisterCredentialsDto, @Res({passthrough: true}) response: Response) {
        return this.appService.registerUser(data, response)
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @ApiOkResponse({description : 'User log outed.'})
    @ApiBadRequestResponse({description: 'Missing refresh tokens.'}) // TODO: add type?
    @Get('/logout')
    logoutUser(@Req() request: Request, @Res({passthrough: true}) response: Response) {
        return this.appService.logoutUser(request, response)
    }


    @ApiOkResponse({description : 'Auth tokens refreshed..', type : AuthTokensDto})
    @Get('/refresh')
    refreshUser(@Req() request: Request, @Res({passthrough: true}) response: Response) : Promise<AuthTokensDto> {
        return this.appService.refreshTokens(request, response)
    }




    @Get("/check-auth-service-health")
    pingServiceA() {
        return this.appService.checkAuthServiceHealth();
    }


}
