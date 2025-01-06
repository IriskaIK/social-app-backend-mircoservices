import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import {ConnectionStatus} from "../connection_status.entity";

export default class ConnectionStatusSeeder implements Seeder {

    track = false;

    public async run(
        dataSource: DataSource,
    ): Promise<any> {
        const repository =  dataSource.getRepository(ConnectionStatus);
        await repository.insert([
            {
                status : 'pending',
                right_to_comment : true,
                right_to_react : true,
                right_to_message : false,
                right_to_view : true
            },
            {
                status: 'accepted',
                right_to_comment : true,
                right_to_react : true,
                right_to_message : true,
                right_to_view : true
            },
            {
                status: 'rejected',
                right_to_comment : true,
                right_to_react : true,
                right_to_message : false,
                right_to_view : true
            },
            {
                status: 'blocked',
                right_to_comment : false,
                right_to_react: false,
                right_to_message: false,
                right_to_view : false
            }
        ]);

    }
}