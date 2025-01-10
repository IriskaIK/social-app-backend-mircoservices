import {Controller, UseFilters} from '@nestjs/common';
import {AuthService} from "src/modules/auth/auth.service";
import {MessagePattern} from "@nestjs/microservices";
import {HttpExceptionFilter} from "src/filters/http-exception.filter";
import {LoginCredentials, RegisterCredentials} from "src/modules/auth/interfaces/userCredentials";
import {UserFullProfileInfoDto} from "src/dto/user-full-profile-info.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @MessagePattern({cmd: "register"})
    async register(credentials: RegisterCredentials): Promise<UserFullProfileInfoDto> {
        return await this.authService.register(credentials);
    }

    @MessagePattern({cmd: "login"})
    async login(credentials: LoginCredentials): Promise<UserFullProfileInfoDto> {
        return await this.authService.login(credentials);
    }

}
