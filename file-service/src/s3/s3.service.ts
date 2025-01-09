import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {
    GetObjectCommand,
    GetObjectCommandInput,
    PutObjectCommand,
    PutObjectCommandInput,
    S3Client
} from "@aws-sdk/client-s3";
import { Upload } from '@aws-sdk/lib-storage';

import {v4 as uuidv4} from 'uuid';
import {getSignedUrl} from '@aws-sdk/s3-request-presigner';
import {ConfigService} from "@nestjs/config";

@Injectable()
export class S3Service {
    private readonly s3Client: S3Client;

    constructor(private readonly configService: ConfigService) {

        this.s3Client = new S3Client({
            region: this.configService.getOrThrow('AWS_S3_REGION'),
            credentials: {
                accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY_ID'),
                secretAccessKey: this.configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
            },
        });
    }

    async uploadFile(file: Buffer, fileName: string): Promise<{ key: string }> {
        const key = `${uuidv4()}-${fileName}`;
        try {

            const upload = new Upload({
                client : this.s3Client,
                params : {
                    Bucket: this.configService.getOrThrow('AWS_S3_BUCKET_NAME'),
                    Key: key,
                    Body: Buffer.from(file),
                }
            })

            await upload.done()

            return {key}
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException('Failed to connect to S3Service');
        }
    }

    async getSignedUrl(key: string): Promise<{ signedUrl: string }> {
        try {
            const getParams: GetObjectCommandInput = {
                Bucket: this.configService.getOrThrow('AWS_S3_BUCKET_NAME'),
                Key: key,
            };
            const signedUrl = await getSignedUrl(this.s3Client, new GetObjectCommand(getParams), {
                expiresIn: 3600,
            });
            return {signedUrl};
        } catch (error) {
            throw new InternalServerErrorException('Error generating signed URL');
        }
    }

    async getMultipleSignedUrls(keys: string[])
        : Promise<{ signedUrls: { key: string, signedUrl: string }[] }> {
        try {
            const signedUrls = await Promise.all(
                keys.map(async (key) => {
                    const getParams = {
                        Bucket: process.env.AWS_BUCKET_NAME,
                        Key: key,
                    };
                    const signedUrl = await getSignedUrl(this.s3Client, new GetObjectCommand(getParams), {
                        expiresIn: 3600,
                    });
                    return {key, signedUrl};
                }),
            );
            return {signedUrls};
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException('Error generating signed URLs');
        }
    }
}
