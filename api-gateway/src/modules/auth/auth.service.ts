import {BadRequestException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {ClientProxy, RpcException} from "@nestjs/microservices";
import {catchError, firstValueFrom, throwError} from "rxjs";
import {Request, Response} from "express";
import {AuthTokensDto} from "src/modules/auth/dto/auth-tokens.dto";
import {UserDetailsDto} from "src/modules/auth/dto/user-details.dto";
import {AuthResponseCredentialsDto} from "src/modules/auth/dto/auth-response-credentials.dto";
import {LoginCredentialsDto} from "src/modules/auth/dto/login-credentials.dto";
import {RegisterCredentialsDto} from "src/modules/auth/dto/register-credentials.dto";

export interface ITokensResponse {
    accessToken: string
    refreshToken: string
}


@Injectable()
export class AuthService {
    constructor(
        @Inject("USER_SERVICE") private readonly userService: ClientProxy,
        @Inject("TOKEN_SERVICE") private readonly authService: ClientProxy
    ) {
    }

    checkAuthServiceHealth() {
        const pattern = {cmd: "check_health"};
        const payload = {};
        return this.authService
            .send<string>(pattern, payload)
    }


    async registerUser(data: RegisterCredentialsDto, response: Response): Promise<AuthResponseCredentialsDto> {
        const pattern = {cmd: "register"};

        // TODO: handle error from service here, return appropriate response
        const user: UserDetailsDto = await firstValueFrom(this.userService.send(pattern, data)
            .pipe(catchError(error => throwError(() => new RpcException(error.response)))))


        const tokens: {
            tokens: AuthTokensDto
        } = await firstValueFrom(this.authService.send({cmd: 'generate_token'}, user));

        console.log(tokens)
        response.cookie('refresh_token', tokens.tokens.refresh_token)
        response.status(201)
        return {...tokens.tokens, user}

    }

    async loginUser(data: LoginCredentialsDto, response: Response): Promise<AuthResponseCredentialsDto> {
        const pattern = {cmd: "login"};
        // TODO: handle error from service here, return appropriate response
        const user: UserDetailsDto = await firstValueFrom(this.userService.send(pattern, data)
            .pipe(catchError(error => throwError(() => new RpcException(error.response)))))

        const tokens: {
            tokens: AuthTokensDto
        } = await firstValueFrom(this.authService.send({cmd: 'generate_token'}, user));

        console.log(tokens)
        response.cookie('refresh_token', tokens.tokens.refresh_token)
        return {...tokens.tokens, user}
    }

    logoutUser(request: Request, response: Response) {
        console.log('in logout service');
        const pattern = {cmd: 'blacklist_token'};

        const authHeader: string = request.headers['authorization'];


        const accessToken: string = authHeader.split(' ')[1];
        const refreshToken: string = request.cookies['refresh_token']

        if (accessToken && refreshToken) {
            response.clearCookie('refresh_token')
            this.authService.send(pattern, {
                accessToken,
                refreshToken
            }).subscribe()
            return {
                message: 'User logged out',
            }
        }
    }


    async refreshTokens(request: Request, response: Response): Promise<AuthTokensDto> {
        const pattern = {cmd: 'refresh_tokens'};

        const refreshToken = request.cookies['refresh_token']
        if (refreshToken) {
            const tokens: {
                tokens: AuthTokensDto
            } = await firstValueFrom(this.authService.send(pattern, refreshToken))
            response.cookie('refresh_token', tokens.tokens.refresh_token)
            return {...tokens.tokens}
        } else {
            throw new BadRequestException('Missing refresh token');
        }
    }

}
