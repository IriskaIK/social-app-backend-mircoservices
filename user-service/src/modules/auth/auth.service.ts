import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "src/entities/user.entity";
import {comparePasswords, hashPassword} from "src/modules/auth/utils/hash.util";
import {LoginCredentials, RegisterCredentials} from "src/modules/auth/interfaces/userCredentials";
import {UserFullProfileInfoDto} from "src/dto/user-full-profile-info.dto";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
    }

    async register(userCredentials: RegisterCredentials): Promise<UserFullProfileInfoDto> {
        const hashedPassword = await hashPassword(userCredentials.password);

        const u = await this.userRepository.findOne({where: {email: userCredentials.email}})
        if (u) {
            throw new ConflictException("User already exists!")
        }

        const user = this.userRepository.create({...userCredentials, password: hashedPassword});
        await this.userRepository.save(user);

        delete user.password

        return user;
    }


    async login(userCredentials: LoginCredentials): Promise<UserFullProfileInfoDto> {
        const user = await this.userRepository.findOne({where: {email: userCredentials.email}});
        if (!user || !(await comparePasswords(userCredentials.password, user.password))) {
            throw new NotFoundException('Invalid credentials');
        }

        delete user.password

        return user;
    }

}
