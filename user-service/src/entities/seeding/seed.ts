import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { runSeeders, SeederOptions } from "typeorm-extension";
import {ConnectionStatus} from "../connection_status.entity";
import ConnectionStatusSeeder from "./connection_status.seeder"

const {
    DATABASE_HOST, DATABASE_PORT, DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_NAME,
} = process.env;



const options: DataSourceOptions & SeederOptions = {
    type: "postgres",
    host: DATABASE_HOST ,
    port: Number(DATABASE_PORT),
    username: DATABASE_USERNAME ,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    entities: [ConnectionStatus],
    seeds: [ConnectionStatusSeeder],
};

const dataSource = new DataSource(options);

dataSource.initialize().then(async () => {
    await dataSource.synchronize(true);
    await runSeeders(dataSource);

    console.log('Seeding complete')

    process.exit();
});