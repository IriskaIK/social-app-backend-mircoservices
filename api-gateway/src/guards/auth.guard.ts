import {
    Injectable,
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Inject,
} from '@nestjs/common';
import {ClientProxy} from '@nestjs/microservices';
import {firstValueFrom} from "rxjs";

import {AuthVerificationResponseDTO, IUser} from "src/interfaces/AuthVerificationResponseDTO";
import {Request} from "express";



declare global {
    namespace Express {
        interface Request {
            user?: IUser,
        }
    }
}


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(@Inject('TOKEN_SERVICE') private readonly authServiceClient: ClientProxy) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];
        if (!authHeader) {
            throw new HttpException('Authorization header missing', HttpStatus.UNAUTHORIZED);
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            throw new HttpException('Token missing', HttpStatus.UNAUTHORIZED);
        }


        try {
            const response: AuthVerificationResponseDTO = await firstValueFrom(this.authServiceClient.send({cmd: 'verify_token'}, token))
            if (!response.valid || !response.payload.id) {
                throw new HttpException('Invalid token payload', HttpStatus.UNAUTHORIZED);
            }
            request.user = response.payload;
            return true;
        } catch (error) {
            console.log(error)
            throw new HttpException('Authentication failed', HttpStatus.UNAUTHORIZED);
        }
    }
}