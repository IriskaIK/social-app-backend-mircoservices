import {Inject, Injectable} from '@nestjs/common';
import {ClientProxy, RpcException} from "@nestjs/microservices";
import {catchError, firstValueFrom, throwError} from "rxjs";

interface ConnectionDTO {
    id: string;
    status : "pending" | "accepted" | "rejected" | "blocked";
    user_to_connect_id : string;
    user_owner_id : string;
}
type StatusTypes = "pending" | "accepted" | "rejected" | "blocked";


@Injectable()
export class ConnectionsService {
    constructor(
        @Inject("USER_SERVICE") private readonly userService: ClientProxy,
    ) {
    }

    private generateModifyConnectionPattern(status : StatusTypes){
        switch(status){
            case "accepted":
                return {cmd : "accept_connection"}
            case "rejected":
                return {cmd : "reject_connection"}
            case "blocked":
                return {cmd : "block_connection"}
            default:
                throw new Error("Unknown status type: " + status);
        }
    }


    async createConnection(user_id : string, connect_to_id : string ){
        const pattern = {cmd: 'create_connection'}

        const payload = {
            user_to_connect_id : connect_to_id,
            user_owner_id : user_id
        }

        return await firstValueFrom(this.userService.send(pattern, payload)
            .pipe(catchError(error => throwError(() => new RpcException(error.response)))))
    }

    async modifyConnection(connect_to_id: string, user_id : string, status : StatusTypes){
        const pattern = this.generateModifyConnectionPattern(status)

        console.log('connect_to_id', connect_to_id)
        console.log('user_id', user_id )


        const payload = {
            user_to_connect_id : connect_to_id,
            user_owner_id : user_id
        }

        return await firstValueFrom(this.userService.send(pattern, payload)
            .pipe(catchError(error => throwError(() => new RpcException(error.response)))))
    }

    async removeConnection(connect_to_id: string, user_id : string){
        const pattern = {cmd: 'remove_connection'}


        const payload = {
            user_to_connect_id : connect_to_id,
            user_owner_id : user_id
        }

        return await firstValueFrom(this.userService.send(pattern, payload)
            .pipe(catchError(error => throwError(() => new RpcException(error.response)))))
    }


    async getFollowers(user_id : string){
        const pattern = {cmd: 'get_followers'}
        return await firstValueFrom(this.userService.send(pattern, user_id)
            .pipe(catchError(error => throwError(() => new RpcException(error.response)))))
    }

    async getFollowing(user_id : string){
        const pattern = {cmd: 'get_following'}
        return await firstValueFrom(this.userService.send(pattern, user_id)
            .pipe(catchError(error => throwError(() => new RpcException(error.response)))))
    }

    async getBlocked(user_id : string){
        const pattern = {cmd: 'get_blocked'}
        return await firstValueFrom(this.userService.send(pattern, user_id)
            .pipe(catchError(error => throwError(() => new RpcException(error.response)))))
    }


    async getPending(user_id : string){
        const pattern = {cmd: 'get_pending'}
        return await firstValueFrom(this.userService.send(pattern, user_id)
            .pipe(catchError(error => throwError(() => new RpcException(error.response)))))
    }
}
