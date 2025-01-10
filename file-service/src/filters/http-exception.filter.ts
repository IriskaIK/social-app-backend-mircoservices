import {
    ArgumentsHost,
    BadRequestException, Catch,
    ExceptionFilter,
    HttpException,
    InternalServerErrorException, RpcExceptionFilter
} from "@nestjs/common";
import {RpcException, TcpContext} from "@nestjs/microservices";
import {Response} from "express";
import {throwError} from "rxjs";



@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        return throwError(() => exception)

    }
}