import {Controller, HttpException, HttpStatus, InternalServerErrorException} from '@nestjs/common';
import {EventPattern, MessagePattern, RpcException} from "@nestjs/microservices";
import {ConnectionsService} from "src/modules/connections/connections.service";



@Controller('connections')
export class ConnectionsController {
    constructor(private readonly connectionsService: ConnectionsService) {
    }


    @EventPattern("create_connection")
    async createRequest(payload: ConnectionDTO) {
        try {
            await this.connectionsService.createConnection(payload.user_to_connect_id, payload.user_owner_id)
            return {statusCode: HttpStatus.CREATED, message: 'Connection created'};
        } catch (error) {
            if (error !instanceof HttpException) {
                console.log(error)
                throw new InternalServerErrorException('Failed to create connection')
            }
        }
    }


    @EventPattern("accept_connection")
    async acceptRequest(payload: ConnectionDTO) {
        try {
            await this.connectionsService.changeConnectionStatus(payload.user_to_connect_id, payload.user_owner_id, 'accepted')
            return {statusCode: HttpStatus.CREATED, message: 'Connection accepted'};

        } catch (error) {
            if (error !instanceof HttpException) {
                console.log(error)
                throw new InternalServerErrorException('Failed to accept connection')
            }
        }

        // catch (error) {
        //     if (error instanceof HttpException) {
        //         throw new RpcException(error)
        //     }
        //
        //     throw new RpcException(new InternalServerErrorException('Failed to accept connection'))
        // }
    }

    @EventPattern("reject_connection")
    async rejectRequest(payload: ConnectionDTO) {
        try {
            await this.connectionsService.changeConnectionStatus(payload.user_to_connect_id, payload.user_owner_id, 'rejected')
            return {statusCode: HttpStatus.CREATED, message: 'Connection rejected'};

        } catch (error) {
            if (error !instanceof HttpException) {
                console.log(error)
                throw new InternalServerErrorException('Failed to reject connection')
            }
        }

    }

    @EventPattern("remove_connection")
    async unfollowUser(payload: ConnectionDTO) {
        try {
            await this.connectionsService.removeConnection(payload.user_to_connect_id, payload.user_owner_id)
            return {statusCode: HttpStatus.CREATED, message: 'Connection removed'};

        } catch (error) {
            if (error !instanceof HttpException) {
                console.log(error)
                throw new InternalServerErrorException('Failed to remove connection')
            }
        }

    }

    @EventPattern("block_connection")
    async blockUser(payload: ConnectionDTO) {
        try {
            await this.connectionsService.blockConnection(payload.user_to_connect_id, payload.user_owner_id)
            return {statusCode: HttpStatus.CREATED, message: 'Connection blocked'};

        } catch (error) {
            if (error !instanceof HttpException) {
                console.log(error)
                throw new InternalServerErrorException('Failed to block connection')
            }
        }

    }

    @MessagePattern("get_followers")
    async getFollowers(payload : {user_id: string}){
        try {
            return this.connectionsService.getFollowersById(payload.user_id)

        }catch (error) {
            if (error !instanceof HttpException) {
                console.log(error)
                throw new InternalServerErrorException('Failed to fetch followers')
            }
        }
    }

    @MessagePattern("get_following")
    async getFollowing(payload : {user_id: string}){
        try {
            return this.connectionsService.getFollowingById(payload.user_id)

        }catch (error) {
            if (error !instanceof HttpException) {
                console.log(error)
                throw new InternalServerErrorException('Failed to fetch following')
            }
        }
    }

    @MessagePattern("get_blocked")
    async getBlocked(payload : {user_id: string}){
        try {
            return this.connectionsService.getBlockedById(payload.user_id)

        }catch (error) {
            if (error !instanceof HttpException) {
                console.log(error)
                throw new InternalServerErrorException('Failed to fetch blocked')
            }
        }
    }

    @MessagePattern("get_pending")
    async getPending(payload : {user_id: string}){
        try {
            return this.connectionsService.getPendingById(payload.user_id)
        }catch (error) {
            if (error !instanceof HttpException) {
                console.log(error)
                throw new InternalServerErrorException('Failed to block pending')
            }
        }
    }

    @MessagePattern('is_in_block')
    async isInBlock(data : IsInBlockReq){
        try {
            if(await this.connectionsService.isInBlock(data.user_id, data.to_id)){
                return {blocked : true}
            }
            return {blocked : false}
        }catch (error) {
            if (error !instanceof HttpException) {
                console.log(error)
                throw new InternalServerErrorException('Failed to fetch blacklist')
            }
        }
    }

}
