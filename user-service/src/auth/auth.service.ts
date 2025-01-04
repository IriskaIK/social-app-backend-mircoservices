import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "src/entities/user.entity";
import {comparePasswords, hashPassword} from "src/auth/utils/hash.util";
import {UserCredentials} from "src/auth/interfaces/userCredentials";
import {RpcException} from "@nestjs/microservices";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
    }

    async register(userCredentials: UserCredentials): Promise<User> {
        const hashedPassword = await hashPassword(userCredentials.password);

        const u = await this.userRepository.findOne({where: {email: userCredentials.email}})
        if (u) {
            throw new RpcException(new ConflictException("User already exists!"));
        }

        const user = this.userRepository.create({...userCredentials, password: hashedPassword});
        await this.userRepository.save(user);
        return user;
    }


    async login(email: string, password: string): Promise<User> {
        const user = await this.userRepository.findOne({where: {email}});
        if (!user || !(await comparePasswords(password, user.password))) {
            throw new RpcException(new NotFoundException('Invalid credentials'));
        }
        return user;
    }

}
