import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log('関数を実行するする前...');

    const http = context.switchToHttp();
    console.log('リクエストのタイプ', context.getType());
    console.log('HTTPバージョン', http.getRequest().httpVersion);
    console.log('URL', http.getRequest().url);
    console.log('メソッド', http.getRequest().method);

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() =>
          console.log(
            `関数を実行した後... かかった時間(${Date.now() - now}ms)`,
          ),
        ),
      );
  }
}
