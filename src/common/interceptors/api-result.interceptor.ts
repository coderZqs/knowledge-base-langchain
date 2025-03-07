import { NestInterceptor, CallHandler, ExecutionContext } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { responseMessage } from '../utils/index';

interface Data<T> {
  data: T;
  code: number;
  msg: string;
}

export class ResponseInterceptor<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Data<T>> {
    return next.handle().pipe(
      map(e => {
        if (e) {
          const { data, msg, code } = e;
          return responseMessage(data, msg, code);
        } else {
          return responseMessage(null, '', 404);
        }
      })
    );
  }
}
