import {
    BadRequestException, HttpException,
    HttpStatus,
    Injectable,
    InternalServerErrorException,
    NotFoundException
} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {In, Repository} from 'typeorm';
import {User} from 'src/entities/user.entity';
import {SuccessfullResponse} from "src/modules/user/interfaces/SuccessfullResponse";
import {RpcException} from "@nestjs/microservices";
import {UserUpdateProfileDto} from "src/dto/user-update-profile.dto";
import {UserFullProfileInfoDto} from "src/dto/user-full-profile-info.dto";
import {UserShortProfileInfoDto} from "src/dto/user-short-profile-info.dto";



@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
    }


    async findById(userId: string, excludeEmail : boolean = true, excludeBirthDate : boolean = true): Promise<UserFullProfileInfoDto|UserShortProfileInfoDto> {
        let user: User

        if(isNaN(+userId)){
            throw new BadRequestException('Invalid user id')
        }

        try {
            user = await this.userRepository.findOne({where: {id: userId}});
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException('Error in user-service during fetching user by id.');
        }
        if (!user) throw new RpcException(new NotFoundException('User not found'));
        delete user.password
        delete user.updatedAt

        if(excludeEmail){
            delete user.email
        }
        if(excludeBirthDate){
            delete user.birthday
        }
        return user;
    }

    async findByIds(ids: string[]):Promise<UserShortProfileInfoDto[]>{
        try {
            const users = await this.userRepository.find({where: {id: In(ids)}});
            users.forEach(user => {
                delete user.password;
                delete user.email
                delete user.birthday
                delete user.updatedAt
            });
            return users;
        } catch (e) {
            console.log(e)
            throw new InternalServerErrorException('Error in user-service during fetching users by ids.');
        }
    }

    async updateById(data : UserUpdateProfileDto): Promise<SuccessfullResponse> {

        try {

            const user = await this.userRepository.findOne({where: {email: data.userData.email}});
            if(user && user.id != data.id) throw new BadRequestException('Email already used!');

            await this.userRepository.update(data.id, {
                first_name : data.userData.first_name,
                last_name : data.userData.last_name,
                email : data.userData.email,
                birthday : data.userData.birthday
            })
            return {
                message : "User updated",
                status : HttpStatus.OK
            }
        }catch (e) {
            console.error(e)
            if(e instanceof HttpException){
                throw e
            }
            throw new InternalServerErrorException('Error in user-service during updating users by ids.');

        }
    }

    async updateImage(uid : string, imageId: string): Promise<SuccessfullResponse> {
        try {
            await this.userRepository.update({id: uid}, {
                image_id : imageId
            });
            return {
                message : "Image updated",
                status : HttpStatus.OK
            }
        }catch (e) {
            console.error(e)
            if(e instanceof HttpException){
                throw e
            }
            throw new InternalServerErrorException('Error in user-service during updating users by ids.');
        }
    }

}
