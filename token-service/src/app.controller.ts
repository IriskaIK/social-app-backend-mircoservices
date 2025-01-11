import {BadRequestException, Controller, HttpException, InternalServerErrorException} from '@nestjs/common';
import {AppService} from './app.service';
import {EventPattern, MessagePattern, RpcException} from "@nestjs/microservices";
import {ITokensResponse} from "src/interfaces/ITokensResponse";
import {IAuthPayload} from "src/interfaces/IAuthPayload";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({cmd: 'generate_tokens'})
  async generateTokens(payload: UserDTO) : Promise<{tokens : ITokensResponse}> {

    if (!payload.id) {
      throw new BadRequestException('User id is required');
    }

    const tokens = await this.appService.generateTokens(payload);
    console.log(tokens);
    return {tokens};
  }


  @MessagePattern({cmd: 'verify_token'})
  async validateToken(payload : {access_token: string}): Promise<{ valid: boolean; payload?: IAuthPayload }> {
    try {
      const response = await this.appService.verifyAccessToken(payload.access_token);
      return {valid: true, payload : response};
    } catch (e) {
      console.error(e)
      return {valid: false, payload : null};
    }
  }

  @MessagePattern('refresh_tokens')
  async refreshToken(payload : {refresh_token: string}): Promise<ITokensResponse> {
    try {
      const response = await this.appService.verifyRefreshToken(payload.refresh_token);
      return await this.appService.generateTokens(response)
    } catch (e) {

      if(e !instanceof HttpException) {
        new InternalServerErrorException('Failed to refresh tokens.')
      }

    }
  }

  @EventPattern('blacklist_tokens')
  async blacklistToken(payload : {refresh_token : string, access_token : string}): Promise<void> {
    //TODO: use event pattern here. Handle errors properly.
    console.log('in blacklistToken controller');
    try {
      await this.appService.blackListTokens(payload.access_token, payload.refresh_token);
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
