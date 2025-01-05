import {BadRequestException, Injectable} from '@nestjs/common';
import {StatusTypes} from "src/modules/connections/interfaces/ConnectionStatus.types";
import {Connection} from "src/entities/connection.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Not, Repository} from "typeorm";
import {User} from "src/entities/user.entity";
import {ConnectionStatus} from "src/entities/connection_status.entity";
import {tr} from "@faker-js/faker";

@Injectable()
export class ConnectionsService {
    constructor(
        @InjectRepository(Connection)
        private readonly connectionRepository: Repository<Connection>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(ConnectionStatus)
        private readonly connectionStatusRepository: Repository<ConnectionStatus>,
    ) {
    }

    async createConnection(userToConnectId: string, ownerId: string, connectionStatus: StatusTypes = "pending") {
        const connection = await this.connectionRepository.findOne({
            where: {
                user: {id: ownerId},
                following: {id: userToConnectId}
            },
            relations: ['status']
        })

        if (connection && connection.status.status == 'rejected') {
            await this.changeConnectionStatus(userToConnectId, ownerId, "pending")
            return
        }else if(connection && connection.status.status != 'rejected') {
            throw new BadRequestException('Connection already exists')
        }

        const user = await this.userRepository.findOneBy({id: ownerId});
        if (!user) {
            throw new BadRequestException('User not found');
        }

        const following = await this.userRepository.findOneBy({id: userToConnectId});
        if (!following) {
            throw new BadRequestException('Following user not found');
        }

        const status = await this.connectionStatusRepository.findOneBy({status: connectionStatus});

        const newConnection = this.connectionRepository.create({
            user,
            following,
            status,
        });

        await this.connectionRepository.save(newConnection)

    }

    async changeConnectionStatus(userToConnectId: string, ownerId: string, status: StatusTypes) {
        const connection = await this.connectionRepository.findOne({
            where: {
                user: {id: ownerId},
                following: {id: userToConnectId}
            }
        })
        if (!connection) {
            throw new BadRequestException('Connection not found')
        }
        const newStatus = await this.connectionStatusRepository.findOneBy({status: status})

        await this.connectionRepository.update({id : connection.id}, {
            status: newStatus,
        })
    }

    async blockConnection(userToConnectId: string, ownerId: string) {
        const connection = await this.connectionRepository.findOne({
            where: {
                user: {id: ownerId},
                following: {id: userToConnectId}
            }
        })
        if (!connection) {
            await this.createConnection(userToConnectId, ownerId, "blocked")
            return
        }

        const newStatus = await this.connectionStatusRepository.findOneBy({status: "blocked"})

        await this.connectionRepository.update({id : connection.id}, {
            status: newStatus,
        })

    }

    async removeConnection(userToConnectId: string, ownerId: string,) {
        const connection = await this.connectionRepository.findOne({
            where: {
                user: {id: ownerId},
                following: {id: userToConnectId}
            }
        })

        if(connection){
            await this.connectionRepository.remove(connection)
        }


    }

    async getFollowersById(ownerId: string) {
        return await this.connectionRepository.find({
            where: {
                following: {id: ownerId},
                status: {status: "accepted"}
            },
            relations: ['user'],
            select: {
                user: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    image_id: true
                }
            }
        })
    }

    async getFollowingById(ownerId: string) {
        return await this.connectionRepository.find({
            where: {
                user: {id: ownerId},
                status: {status: "accepted"}
            },
            relations: ['following'],
            select: {
                following: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    image_id: true
                }
            }
        })
    }

    async getBlockedById(ownerId: string) {
        return await this.connectionRepository.find({
            where: {
                user: {id: ownerId},
                status: {status: "blocked"}
            },
            relations: ['following'],
            select: {
                following: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    image_id: true
                }
            }
        })
    }

    async getPendingById(ownerId: string) {
        return await this.connectionRepository.find({
            where: {
                following: {id: ownerId},
                status: {status: "pending"}
            },
            relations: ['user'],
            select: {
                user: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    image_id: true
                }
            }
        })
    }

    async isInBlock(userId : string, toId : string) {
        const connection = await this.connectionRepository.findOne({
            where : {
                following : {id : userId},
                user : {id : toId}
            },
            relations : ["status"]
        })

        if(!connection){
            return false
        }

        if(connection.status.status == 'blocked'){
            return true
        }

    }


}
