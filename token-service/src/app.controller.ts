import {BadRequestException, Controller, Get, InternalServerErrorException} from '@nestjs/common';
import { AppService } from './app.service';
import {MessagePattern, RpcException} from "@nestjs/microservices";
import {ITokensResponse} from "src/interfaces/ITokensResponse";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({cmd: 'generate_token'})
  async generateToken(user: UserDTO) : Promise<{tokens : ITokensResponse}> {

    if (!user.id) {
      throw new RpcException(new BadRequestException('User id is required'));
    }

    const tokens = await this.appService.generateTokens(user);
    console.log(tokens);
    return {tokens};
  }


  @MessagePattern({cmd: 'verify_token'})
  async validateToken(token: string): Promise<{ valid: boolean; payload?: any }> {
    try {
      const payload = await this.appService.verifyAccessToken(token);
      return {valid: true, payload};
    } catch (e) {
      console.error(e)
      return {valid: false};
    }
  }

  @MessagePattern({cmd: 'refresh_tokens'})
  async refreshToken(token: string): Promise<{tokens : ITokensResponse}> {
    try {
      const payload = await this.appService.verifyRefreshToken(token);
      const tokens = await this.appService.generateTokens(payload)
      return {tokens}
    } catch (e) {

      if(e instanceof BadRequestException) {
        throw new RpcException(e)
      }
      throw new RpcException(new InternalServerErrorException('Failed to refresh tokens.'))

    }
  }

  @MessagePattern({cmd: 'blacklist_token'})
  async blacklistToken(tokens : {refreshToken : string, accessToken : string}): Promise<{ status : string }> {
    console.log('in blacklistToken controller');
    try {
      await this.appService.blackListTokens(tokens.accessToken, tokens.refreshToken);
      return {status : 'ok'}
    } catch (e) {
      console.error(e)
      throw new RpcException(e)
    }
  }


  @MessagePattern({cmd: "check_health"})
  ping(_: any) {
    return "auth-service is running";
  }


}
