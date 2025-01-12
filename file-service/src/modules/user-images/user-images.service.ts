import {BadRequestException, HttpException, Injectable, InternalServerErrorException} from '@nestjs/common';
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
        try {

            const prevImage = await this.imageRepository.findOne({where : {
                owner_id : createUserImageDto.owner_id
                }})

            const filename = createUserImageDto.filename.replaceAll(" ", "")


            const {key} = await this.s3Service.uploadFile(createUserImageDto.fileBuffer, filename)

            const image = this.imageRepository.create({
                filepath : key,
                filename : filename,
                owner_id : createUserImageDto.owner_id
            })

            await this.imageRepository.save(image);

            if(prevImage){
                await this.s3Service.removeFile(prevImage.filepath)
                await this.imageRepository.remove(prevImage)
            }

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
            const image = await this.imageRepository.findOne({where : {owner_id : id}})
            if(!image){
                throw new BadRequestException('Image not found')
            }
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


    async remove(id: string) {
        try {
            const image = await this.imageRepository.findOne({where : {
                    owner_id : id
                }})
            if(!image){
                throw new BadRequestException('Image not found')
            }
            await this.s3Service.removeFile(image.filepath)
            await this.imageRepository.remove(image)
            return {success: true}
        }catch (e) {
            console.log(e)
            if(e instanceof HttpException) {
                throw e
            }
            throw new InternalServerErrorException("Failed to remove profile image");

        }
    }
}
