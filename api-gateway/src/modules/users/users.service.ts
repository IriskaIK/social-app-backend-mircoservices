import {Inject, Injectable, Scope, UnauthorizedException} from '@nestjs/common';
import {ClientProxy, RpcException} from "@nestjs/microservices";
import {UserDTO} from "src/interfaces/UserDTO";
import {catchError, firstValueFrom, throwError} from "rxjs";
import {SuccessfullResponse} from "src/interfaces/SuccessfullResponse";
import {Request} from 'express';


@Injectable({scope: Scope.REQUEST})
export class UsersService {
    constructor(
        @Inject("USER_SERVICE") private readonly userService: ClientProxy,
        @Inject("FILE_SERVICE") private readonly fileService: ClientProxy
    ) {
    }

    async getUserById(id: string, options: { excludeEmail: boolean, excludeBirthDate: boolean }): Promise<UserDTO> {
        const pattern = {cmd: 'find_user_by_id'}

        return await firstValueFrom(this.userService.send(pattern, {
            id,
            excludeEmail: options.excludeEmail,
            excludeBirthDate: options.excludeBirthDate
        })
            .pipe(catchError(error => throwError(() => new RpcException(error.response)))))
    }


    async getUsersByIds(ids: string[]): Promise<UserDTO[]> {
        const pattern = {cmd: 'find_users_by_ids'}
        return await firstValueFrom(this.userService.send(pattern, ids)
            .pipe(catchError(error => throwError(() => new RpcException(error.response)))))
    }

    async updateUserById(data: UserDTO, req: Request): Promise<SuccessfullResponse> {
        const pattern = {cmd: 'update_user_by_id'}

        if (!req.user.id) {
            throw new UnauthorizedException('Trying to modify another user!')
        }

        return await firstValueFrom(this.userService.send(pattern, {id: req.user.id, userData: data})
            .pipe(catchError(error => throwError(() => new RpcException(error.response)))))
    }

    async uploadProfileImage(filename: string, fileBuffer: Buffer, userId : string) {
        const pattern = {cmd: 'upload_profile_image'}

        const profileImage: {id : string, key : string} =  await firstValueFrom(this.fileService.send(pattern, {
            filename: filename,
            fileBuffer: fileBuffer,
            owner_id : userId
        })
            .pipe(catchError(error => throwError(() => new RpcException(error.response)))))

        this.userService.send({cmd : 'update_image_id'}, {uid : profileImage.id, imageId : profileImage.id})
            .pipe(catchError(error => throwError(() => new RpcException(error.response))))

        return profileImage
    }

    async getProfileImage(id:string){
        const pattern = {cmd: 'get_profile_image'}
        return await firstValueFrom(this.fileService.send(pattern, id)
            .pipe(catchError(error => throwError(() => new RpcException(error.response)))))
    }
}
