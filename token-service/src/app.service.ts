import {BadRequestException, Inject, Injectable, InternalServerErrorException} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {RpcException} from "@nestjs/microservices";
import {IAuthPayload, TokenType} from "src/interfaces/IAuthPayload";
import {ITokensResponse} from "src/interfaces/ITokensResponse";
import * as crypto from 'crypto';
import {CACHE_MANAGER} from "@nestjs/common/cache";
import {Cache} from 'cache-manager';
import {RedisStore} from "cache-manager-redis-yet";

// import {RedisStore} from "cache-manager-redis-store";


@Injectable()
export class AppService {
    private readonly accessTokenSecret: string;
    private readonly accessTokenExpiration: string;
    private readonly refreshTokenSecret: string;
    private readonly refreshTokenExpiration: string;


    constructor(
        private readonly jwtService: JwtService,
        @Inject(CACHE_MANAGER) private cache: Cache // fuck it, official doc still suggest using this approach
    ) {

        this.accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
        this.accessTokenExpiration = process.env.ACCESS_TOKEN_EXPIRATION;

        this.refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
        this.refreshTokenExpiration = process.env.REFRESH_TOKEN_EXPIRATION;
    }


    private hashToken(token: string): string {
        return crypto.createHash('sha256').update(token).digest('hex');
    }


    async verifyAccessToken(token: string): Promise<IAuthPayload> {

        const hashedToken = this.hashToken(token);
        let isBlackListed: boolean

        try {
            // isBlackListed = await this.isTokenBlacklisted(`access:${hashedToken}`)
            isBlackListed = await this.isTokenBlacklisted(`access:${token}`)


        } catch (error) {
            throw new InternalServerErrorException('Failed to check access token.')
        }

        if (isBlackListed) {
            throw new BadRequestException('Token is compromised.')
        }


        try {
            return await this.jwtService.verifyAsync<IAuthPayload>(token,
                {
                    secret: this.accessTokenSecret
                });
        } catch (err) {
            console.error(err);
            throw new BadRequestException('Invalid token');
        }
    }

    async verifyRefreshToken(token: string): Promise<IAuthPayload> {

        const hashedToken = this.hashToken(token);

        let isBlackListed: boolean

        try {
            // isBlackListed = await this.isTokenBlacklisted(`refresh:${hashedToken}`)
            isBlackListed = await this.isTokenBlacklisted(`refresh:${token}`)

        } catch (error) {
            console.error(error)
            throw new InternalServerErrorException('Failed to check access token.')
        }

        if (isBlackListed) {
            throw new BadRequestException('Token is compromised.')
        }


        try {
            return await this.jwtService.verifyAsync<IAuthPayload>(token,
                {
                    secret: this.refreshTokenSecret
                });
        } catch (err) {
            console.error(err);
            throw new BadRequestException('Invalid token');
        }
    }

    async generateTokens(user: UserDTO): Promise<ITokensResponse> {
        const accessTokenPromise = this.jwtService.signAsync(
            {
                id: user.id,
                tokenType: TokenType.ACCESS_TOKEN,
            },
            {
                secret: this.accessTokenSecret,
                expiresIn: this.accessTokenExpiration
            }
        )
        const refreshTokenPromise = this.jwtService.signAsync(
            {
                id: user.id,
                tokenType: TokenType.REFRESH_TOKEN,
            },
            {
                secret: this.refreshTokenSecret,
                expiresIn: this.refreshTokenExpiration
            }
        )

        const [accessToken, refreshToken] = await Promise.all([
            accessTokenPromise, refreshTokenPromise
        ])

        return {accessToken, refreshToken}
    }

    async blackListTokens(accessToken: string, refreshToken: string): Promise<void> {
        const accessHashedToken = this.hashToken(accessToken);
        const refreshHashedToken = this.hashToken(refreshToken);


        const accessExp = this.getTokenExpiration(accessToken);
        const refreshExp = this.getTokenExpiration(refreshToken);


        try {

            await this.cache.set(`access:${accessToken}`, 'blacklisted', accessExp)
            await this.cache.set(`refresh:${refreshToken}`, 'blacklisted', refreshExp)

        } catch (e) {
            console.error(e);
            throw new InternalServerErrorException("Failed to log out");
        }

    }


    private getTokenExpiration(token: string): number {
        const decoded = this.jwtService.decode(token) as any;
        const currentTimestamp = Math.floor(Date.now() / 1000);
        return decoded.exp - currentTimestamp;
    }

    private async isTokenBlacklisted(key: string): Promise<boolean> {
        const res = await this.cache.get(key)
        return res !== undefined;
    }


}
