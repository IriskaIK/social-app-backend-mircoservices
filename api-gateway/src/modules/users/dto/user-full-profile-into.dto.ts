import {UserShortProfileInfoDto} from "src/modules/users/dto/user-short-profile-info.dto";

export interface UserFullProfileIntoDto extends UserShortProfileInfoDto{
    birthday : string;
    email : string;
}