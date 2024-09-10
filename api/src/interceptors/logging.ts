import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse<Response>();
    //const user: UserPayload = request.user ? request.user : null;

    if (context.getArgs()[0].url === '/healthz') return;

    return next
      .handle()
      .pipe(
        tap(() => {
          this.logger.log(
            `[${response.statusCode}] ${context.getArgs()[0].method} ${context.getArgs()[0].url} ${Date.now() - now}ms`,
          );

          return;
        }),
      );
  }
}