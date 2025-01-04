import {ArgumentsHost, Catch, Inject, Injectable, RpcExceptionFilter, UseFilters} from '@nestjs/common';

@Injectable()
export class AppService {


    getHello(): string {
        return 'Hello World!';
    }
}
