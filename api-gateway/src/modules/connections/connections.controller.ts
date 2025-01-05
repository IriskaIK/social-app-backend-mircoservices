import {Controller, Get, Param, Req, UseGuards} from '@nestjs/common';
import {ConnectionsService} from "src/modules/connections/connections.service";
import {AuthGuard} from "src/guards/auth.guard";
import {Request} from "express";

@Controller('connections')
export class ConnectionsController {
    constructor(private readonly connectionsService: ConnectionsService) {
    }


    @UseGuards(AuthGuard)
    @Get('/connect/:connect_to_id')
    async createConnection(@Param('connect_to_id') connect_to_id: string, @Req() req: Request) {
        return await this.connectionsService.createConnection(req.user.id, connect_to_id)
    }

    @UseGuards(AuthGuard)
    @Get('/accept/:connection_by_id')
    async acceptConnection(@Param('connection_by_id') connection_by_id: string, @Req() req: Request) {
        return await this.connectionsService.modifyConnection(req.user.id, connection_by_id, 'accepted')
    }

    @UseGuards(AuthGuard)
    @Get('/reject/:connection_by_id')
    async rejectConnection(@Param('connection_by_id') connection_by_id: string, @Req() req: Request) {
        return await this.connectionsService.modifyConnection(req.user.id, connection_by_id, 'rejected')
    }

    @UseGuards(AuthGuard)
    @Get('/block/:user_to_block_id')
    async blockConnection(@Param('user_to_block_id') blockedUserId: string, @Req() req: Request) {
        //TODO: only not blocked users can see user details.
        return await this.connectionsService.modifyConnection(blockedUserId, req.user.id, 'blocked')
    }


    @UseGuards(AuthGuard)
    @Get('/remove/:connection_to_id')
    async removeConnection(@Param('connection_to_id') connection_to_id: string, @Req() req: Request) {
        return await this.connectionsService.removeConnection(connection_to_id, req.user.id)
    }


    @Get('/followers/:id')
    async getFollowers(@Param('id') id: string) {
        return await this.connectionsService.getFollowers(id)
    }


    @Get('/following/:id')
    async getFollowing(@Param('id') id: string) {
        return await this.connectionsService.getFollowing(id)
    }

    @UseGuards(AuthGuard)
    @Get('/blocked')
    async getBlocked(@Req() req : Request){
        return await this.connectionsService.getBlocked(req.user.id)
    }

    @UseGuards(AuthGuard)
    @Get('/pending')
    async getPending(@Req() req : Request){
        return await this.connectionsService.getPending(req.user.id)
    }

}
