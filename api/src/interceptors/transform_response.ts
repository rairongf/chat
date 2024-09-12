import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ChatResponse } from '../interfaces';

@Injectable()
export class TransformResponseInterceptor<T>
  implements NestInterceptor<T, ChatResponse<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ChatResponse<T>> {
    const http = context.switchToHttp().getResponse();
    return next
      .handle()
      .pipe(map((data) => ({ data, statusCode: http.statusCode })));
  }
}