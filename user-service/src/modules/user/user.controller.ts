import {Controller, Post, Body, Get, Param, Inject} from '@nestjs/common';
import {UserService} from 'src/modules/user/user.service';
import {ClientProxy, MessagePattern, Payload} from "@nestjs/microservices";
import {SuccessfullResponse} from "src/modules/user/interfaces/SuccessfullResponse";
import {UserUpdateProfileDto} from "src/dto/user-update-profile.dto";
import {UserShortProfileInfoDto} from "src/dto/user-short-profile-info.dto";
import {UserFullProfileInfoDto} from "src/dto/user-full-profile-info.dto";
import {UserImageUpdateDto} from "src/dto/user-image-update.dto";

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {
    }

    @MessagePattern({cmd: "find_user_by_id"})
    async findById(data: IFindByIdOptions): Promise<UserShortProfileInfoDto | UserFullProfileInfoDto> {
        return this.userService.findById(data.id, data.excludeEmail, data.excludeBirthDate);
    }

    @MessagePattern({cmd: "find_users_by_ids"})
    async findByIds(ids: string[]): Promise<UserShortProfileInfoDto[]> {
        return this.userService.findByIds(ids)
    }

    @MessagePattern({cmd: "update_user_by_id"})
    async updateById(data: UserUpdateProfileDto): Promise<SuccessfullResponse> {
        return this.userService.updateById(data);
    }

    @MessagePattern({cmd: 'update_image_id'})
    async updateImage(@Payload() data: UserImageUpdateDto) {
        return this.userService.updateImage(data.user_id, data.image_id)
    }


}
