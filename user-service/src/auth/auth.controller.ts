import { Controller } from '@nestjs/common';
import {AuthService} from "src/auth/auth.service";
import {UserCredentials} from "src/auth/interfaces/userCredentials";
import {MessagePattern} from "@nestjs/microservices";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }


    @MessagePattern({cmd: "register"})
    async register(
        {email, password, first_name, last_name}: UserCredentials,
    ) {
        return this.authService.register({email, password, first_name, last_name});
    }

    @MessagePattern({cmd: "login"})
    async login({email, password}: { email: string; password: string }) {
        return this.authService.login(email, password);
    }

}
