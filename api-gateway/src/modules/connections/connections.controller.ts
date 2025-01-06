import {Controller, Get, Param, Req, UseGuards} from '@nestjs/common';
import {ConnectionsService} from "src/modules/connections/connections.service";
import {AuthGuard} from "src/guards/auth.guard";
import {Request} from "express";
import {UserDetailsGuard} from "src/guards/userDetails.guard";

@Controller('connections')
export class ConnectionsController {
    constructor(private readonly connectionsService: ConnectionsService) {
    }


    @UseGuards(AuthGuard)
    @Get('/connect/:id')
    async createConnection(@Param('id') connect_to_id: string, @Req() req: Request) {
        return await this.connectionsService.createConnection(req.user.id, connect_to_id)
    }

    @UseGuards(AuthGuard)
    @Get('/accept/:id')
    async acceptConnection(@Param('id') connection_by_id: string, @Req() req: Request) {
        return await this.connectionsService.modifyConnection(req.user.id, connection_by_id, 'accepted')
    }

    @UseGuards(AuthGuard)
    @Get('/reject/:id')
    async rejectConnection(@Param('id') connection_by_id: string, @Req() req: Request) {
        return await this.connectionsService.modifyConnection(req.user.id, connection_by_id, 'rejected')
    }

    @UseGuards(AuthGuard)
    @Get('/block/:id')
    async blockConnection(@Param('id') blockedUserId: string, @Req() req: Request) {
        //TODO: only not blocked users can see user details.
        return await this.connectionsService.modifyConnection(blockedUserId, req.user.id, 'blocked')
    }


    @UseGuards(AuthGuard)
    @Get('/remove/:id')
    async removeConnection(@Param('id') connection_to_id: string, @Req() req: Request) {
        return await this.connectionsService.removeConnection(connection_to_id, req.user.id)
    }

    @UseGuards(UserDetailsGuard)
    @UseGuards(AuthGuard)
    @Get('/followers/:id')
    async getFollowers(@Param('id') id: string) {
        return await this.connectionsService.getFollowers(id)
    }


    @UseGuards(UserDetailsGuard)
    @UseGuards(AuthGuard)
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
