import {
    BadRequestException,
    Inject,
    Injectable,
    InternalServerErrorException,
    Scope,
    UnauthorizedException
} from '@nestjs/common';
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

    async uploadProfileImage(filename: string, fileBuffer: Buffer, userId: string, req : Request) {
        const pattern = {cmd: 'upload_profile_image'}

        const profileImage: { id: string, key: string } = await firstValueFrom(this.fileService.send(pattern, {
            filename: filename,
            fileBuffer: fileBuffer,
            owner_id: userId
        })
            .pipe(catchError(error => throwError(() => new RpcException(error.response)))))

        const res = await firstValueFrom(this.userService.send({cmd: 'update_image_id'}, {
            uid: userId,
            imageId: profileImage.id
        })
            .pipe(catchError(error => throwError(() => new RpcException(error.response)))))

        req.user.image_id = profileImage.id
        return profileImage
    }

    async getProfileImage(id: string) {
        const pattern = {cmd: 'get_profile_image'}
        return await firstValueFrom(this.fileService.send(pattern, id)
            .pipe(catchError(error => throwError(() => new RpcException(error.response)))))
    }

    async removeProfileImage( uid: string) {


        const image_id = (await this.getUserById(uid, {excludeEmail : false, excludeBirthDate : false})).image_id
        if(image_id === null){
            throw new BadRequestException('Image does not exist')
        }

        await firstValueFrom(this.userService.send({cmd: 'update_image_id'}, {uid: uid, imageId: null})
            .pipe(catchError(error => throwError(() => new RpcException(error.response)))))

        await firstValueFrom(this.fileService.send({cmd: 'remove_profile_image'}, image_id)
            .pipe(catchError(error => throwError(() => new RpcException(error.response)))))



        return {statusCode: 200, statusMessage: 'success'};

    }
}
