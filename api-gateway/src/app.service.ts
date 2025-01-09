import {ArgumentsHost, Catch, Inject, Injectable, RpcExceptionFilter, UseFilters} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";

@Injectable()
export class AppService {




    getHello(): string {
        return 'Hello World!';
    }
}
