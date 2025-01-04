import {BadRequestException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {ClientProxy, RpcException} from "@nestjs/microservices";
import {UserCredentials} from "src/interfaces/UserCredentials";
import {UserDTO} from "src/interfaces/UserDTO";
import {catchError, firstValueFrom, throwError} from "rxjs";
import {Request, Response} from "express";

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


    async registerUser(data: UserCredentials, response: Response) {
        const pattern = {cmd: "register"};

        const user: UserDTO = await firstValueFrom(this.userService.send(pattern, data)
            .pipe(catchError(error => throwError(() => new RpcException(error.response)))))


        delete user.password
        const tokens: {
            tokens: ITokensResponse
        } = await firstValueFrom(this.authService.send({cmd: 'generate_token'}, user));

        console.log(tokens)
        response.cookie('refresh_token', tokens.tokens.refreshToken)
        return {...tokens, user}

    }

    async loginUser(data: { email: string; password: string }, response: Response) {
        const pattern = {cmd: "login"};

        const user: UserDTO = await firstValueFrom(this.userService.send(pattern, data)
            .pipe(catchError(error => throwError(() => new RpcException(error.response)))))

        delete user.password;

        const tokens: {
            tokens: ITokensResponse
        } = await firstValueFrom(this.authService.send({cmd: 'generate_token'}, user));

        console.log(tokens)
        response.cookie('refresh_token', tokens.tokens.refreshToken)
        return {...tokens, user}
    }

    logoutUser(request: Request, response: Response) {
        console.log('in logout service');
        const pattern = {cmd: 'blacklist_token'};

        const authHeader = request.headers['authorization'];


        const accessToken = authHeader.split(' ')[1];
        const refreshToken = request.cookies['refresh_token']

        if (accessToken && refreshToken) {
            response.clearCookie('refresh_token')
            this.authService.send(pattern, {
                accessToken,
                refreshToken
            }).subscribe()
            return {
                message: "User log outed",
                status: HttpStatus.OK
            }
        }
    }


    async refreshTokens(request: Request, response: Response) {
        const pattern = {cmd: 'refresh_tokens'};

        const refreshToken = request.cookies['refresh_token']
        if(refreshToken){
            const tokens: {
                tokens: ITokensResponse
            } = await firstValueFrom(this.authService.send(pattern, refreshToken))
            response.cookie('refresh_token', tokens.tokens.refreshToken)
            return {...tokens}
        }else {
            throw new BadRequestException('Missing refresh token');
        }
    }

}
