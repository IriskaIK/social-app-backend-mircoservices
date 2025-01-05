import {Controller, HttpException, HttpStatus, InternalServerErrorException} from '@nestjs/common';
import {MessagePattern, RpcException} from "@nestjs/microservices";
import {ConnectionsService} from "src/modules/connections/connections.service";


//TODO : implement filters on HTTP exception. Send them as RpcException.

@Controller('connections')
export class ConnectionsController {
    constructor(private readonly connectionsService: ConnectionsService) {
    }


    @MessagePattern({cmd: "create_connection"})
    async createRequest(details: ConnectionDTO) {
        try {
            await this.connectionsService.createConnection(details.user_to_connect_id, details.user_owner_id)
            return {statusCode: HttpStatus.CREATED, message: 'Connection created'};
        } catch (error) {
            if (error instanceof HttpException) {
                throw new RpcException(error)
            }

            throw new RpcException(new InternalServerErrorException('Failed to create connection'))
        }
    }


    @MessagePattern({cmd: "accept_connection"})
    async acceptRequest(details: ConnectionDTO) {
        try {
            await this.connectionsService.changeConnectionStatus(details.user_to_connect_id, details.user_owner_id, 'accepted')
            return {statusCode: HttpStatus.CREATED, message: 'Connection accepted'};

        } catch (error) {
            if (error instanceof HttpException) {
                throw new RpcException(error)
            }

            throw new RpcException(new InternalServerErrorException('Failed to accept connection'))
        }
    }

    @MessagePattern({cmd: "reject_connection"})
    async rejectRequest(details: ConnectionDTO) {
        try {
            await this.connectionsService.changeConnectionStatus(details.user_to_connect_id, details.user_owner_id, 'rejected')
            return {statusCode: HttpStatus.CREATED, message: 'Connection rejected'};

        } catch (error) {
            if (error instanceof HttpException) {
                throw new RpcException(error)
            }
            throw new RpcException(new InternalServerErrorException('Failed to reject connection'))
        }

    }

    @MessagePattern({cmd: "remove_connection"})
    async unfollowUser(details: ConnectionDTO) {
        try {
            await this.connectionsService.removeConnection(details.user_to_connect_id, details.user_owner_id)
            return {statusCode: HttpStatus.CREATED, message: 'Connection removed'};

        } catch (error) {
            console.log(error)
            if (error instanceof HttpException) {
                throw new RpcException(error)
            }

            throw new RpcException(new InternalServerErrorException('Failed to remove connection'))
        }

    }

    @MessagePattern({cmd: "block_connection"})
    async blockUser(details: ConnectionDTO) {
        try {
            await this.connectionsService.blockConnection(details.user_to_connect_id, details.user_owner_id)
            return {statusCode: HttpStatus.CREATED, message: 'Connection blocked'};

        } catch (error) {
            if (error instanceof HttpException) {
                throw new RpcException(error)
            }

            throw new RpcException(new InternalServerErrorException('Failed to block connection'))
        }

    }

    @MessagePattern({cmd : "get_followers"})
    async getFollowers(user_id : string){
        try {
            return this.connectionsService.getFollowersById(user_id)

        }catch (error) {
            if (error instanceof HttpException) {
                throw new RpcException(error)
            }

            throw new RpcException(new InternalServerErrorException('Failed to fetch connections'))
        }
    }

    @MessagePattern({cmd : "get_following"})
    async getFollowing(user_id : string){
        try {
            return this.connectionsService.getFollowingById(user_id)

        }catch (error) {
            if (error instanceof HttpException) {
                throw new RpcException(error)
            }

            throw new RpcException(new InternalServerErrorException('Failed to fetch connections'))
        }
    }

    @MessagePattern({cmd : "get_blocked"})
    async getBlocked(user_id : string){
        try {
            return this.connectionsService.getBlockedById(user_id)

        }catch (error) {
            if (error instanceof HttpException) {
                throw new RpcException(error)
            }

            throw new RpcException(new InternalServerErrorException('Failed to fetch connections'))
        }
    }

    @MessagePattern({cmd: "get_pending"})
    async getPending(user_id : string){
        try {
            return this.connectionsService.getPendingById(user_id)
        }catch (error) {
            if (error instanceof HttpException) {
                throw new RpcException(error)
            }

            throw new RpcException(new InternalServerErrorException('Failed to fetch connections'))
        }
    }

    @MessagePattern({cmd : 'is_in_block'})
    async isInBlock(data : {user_id: string, to_id : string}){
        try {
            if(await this.connectionsService.isInBlock(data.user_id, data.to_id)){
                return {blocked : true}
            }
            return {blocked : false}
        }catch (error) {
            if (error instanceof HttpException) {
                throw new RpcException(error)
            }

            throw new RpcException(new InternalServerErrorException('Failed to fetch connections'))
        }
    }

}
