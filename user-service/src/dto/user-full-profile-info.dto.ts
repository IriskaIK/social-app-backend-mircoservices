import {UserShortProfileInfoDto} from "src/dto/user-short-profile-info.dto";

export interface UserFullProfileInfoDto extends UserShortProfileInfoDto {
    email: string,
    birthday : Date | null
}