import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { BusinessException } from '../exceptions/response.exception';

interface myError {
  readonly status: number;
  readonly statusCode?: number;
  readonly message?: string;
}
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = this.getStatus(exception);
    let message = this.getErrorMessage(exception);

    // 判断是否系统错误
    if (
      status === HttpStatus.INTERNAL_SERVER_ERROR &&
      !(exception instanceof HttpException)
    ) {
      message = '服务器内部错误!';
    }

    const apiErrorCode =
      exception instanceof BusinessException
        ? exception.getErrorCode()
        : status;

    // 返回基础响应结果
    const resBody = {
      code: apiErrorCode,
      message,
      data: null,
    };

    response.status(status).send(resBody);
  }

  getErrorMessage(exception) {
    console.log(exception);
    if (exception instanceof HttpException) {
      return exception.message;
    } else if (exception instanceof NotFoundException) {
      return exception.message;
    } else {
      return (
        (exception as any)?.response?.message ??
        (exception as myError)?.message ??
        `${exception}`
      );
    }
  }

  getStatus(exception: unknown): number {
    if (exception instanceof HttpException) {
      return exception.getStatus();
    } else {
      return (
        (exception as myError).status ??
        (exception as myError).statusCode ??
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
