import {ApiProperty} from "@nestjs/swagger";
import {UserDetailsDto} from "src/modules/auth/dto/user-details.dto";
import {AuthTokensDto} from "src/modules/auth/dto/auth-tokens.dto";

export class AuthResponseCredentialsDto extends AuthTokensDto{
    @ApiProperty()
    user : UserDetailsDto

}