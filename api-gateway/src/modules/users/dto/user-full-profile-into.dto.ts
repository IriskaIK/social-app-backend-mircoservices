import {UserShortProfileInfoDto} from "src/modules/users/dto/user-short-profile-info.dto";
import {ApiProperty} from "@nestjs/swagger";

export class UserFullProfileIntoDto extends UserShortProfileInfoDto{

    @ApiProperty()
    birthday : string;

    @ApiProperty()
    email : string;
}