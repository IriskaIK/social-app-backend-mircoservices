import {HttpException, Injectable, InternalServerErrorException} from '@nestjs/common';
import {CreateUserImageDto} from 'src/modules/user-images/dto/create-user-image.dto';
import {UpdateUserImageDto} from 'src/modules/user-images/dto/update-user-image.dto';
import {S3Service} from "src/s3/s3.service";
import {InjectRepository} from "@nestjs/typeorm";
import {UserImage} from "src/modules/user-images/entities/user-image.entity";
import {In, Repository} from 'typeorm';

@Injectable()
export class UserImagesService {
    constructor(private readonly s3Service: S3Service,
                @InjectRepository(UserImage)
                private readonly imageRepository: Repository<UserImage>,
    ) {
    }


    async uploadImage(createUserImageDto: CreateUserImageDto) {
        //TODO: remove prev image if exists
        try {
            const filename = createUserImageDto.filename.replaceAll(" ", "")


            const {key} = await this.s3Service.uploadFile(createUserImageDto.fileBuffer, filename)

            const image = this.imageRepository.create({
                filepath : key,
                filename : filename
            })
            await this.imageRepository.save(image)

            return {id : image.id, key : image.filepath};

        } catch (error) {
            console.log(error)
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Failed to upload profile image");
        }

    }


    async findOne(id: string) {
        try {
            const image = await this.imageRepository.findOne({where : {id : id}})

            const {signedUrl} = await this.s3Service.getSignedUrl(image.filepath)

            return {signedUrl}

        }catch (error){
            console.log(error)
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Failed to retrieve profile image");
        }
    }


    remove(id: number) {
        //TODO: implement
        return `This action removes a #${id} userImage`;
    }
}
