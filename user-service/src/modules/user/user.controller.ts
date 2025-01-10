import {Controller, Post, Body, Get, Param, Inject} from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import {ClientProxy, MessagePattern, Payload} from "@nestjs/microservices";
import {UserDTO} from "src/modules/user/interfaces/UserDTO";
import {SuccessfullResponse} from "src/modules/user/interfaces/SuccessfullResponse";

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService,

    ) {}



    @MessagePattern({cmd: "find_user_by_id"})
    async findById(data : {id: string, excludeEmail? : boolean, excludeBirthDate? : boolean}) {
        return this.userService.findById(data.id, data.excludeEmail, data.excludeBirthDate);
    }

    @MessagePattern({cmd: "find_users_by_ids"})
    async findByIds(ids: string[]) {
        return this.userService.findByIds(ids)
    }

    @MessagePattern({cmd: "update_user_by_id"})
    async updateById(data : {id: string, userData: UserDTO}) : Promise<SuccessfullResponse> {
        return this.userService.updateById(data);
    }

    @MessagePattern({cmd : 'update_image_id'})
    async updateImage(@Payload() data : {uid : string, imageId: string | null}){
        console.log(data)
        return this.userService.updateImage(data.uid, data.imageId)
    }









}
