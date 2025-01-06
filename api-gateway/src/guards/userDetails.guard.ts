import {
    Injectable,
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Inject, InternalServerErrorException, ForbiddenException,
} from '@nestjs/common';
import {ClientProxy} from '@nestjs/microservices';
import {firstValueFrom} from "rxjs";

import {Request} from "express";

@Injectable()
export class UserDetailsGuard implements CanActivate {
    constructor(@Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        if(!request.user){
            return true
        }
        const userId = request.user.id;
        const toAccessId = request.params['id']
        if(!toAccessId){
            return true
        }
        try {
            const response: {blocked : boolean} = await firstValueFrom(this.userServiceClient.send({cmd: 'is_in_block'}, {user_id : userId, to_id : toAccessId}))
            console.log(response)

            if(response.blocked){
                throw new ForbiddenException('Access denied')
            }
            return true
        } catch (error) {
            if(error instanceof HttpException){
                throw error;
            }
            throw new InternalServerErrorException('Failed to check access');
        }
    }
}