import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import type { Response } from 'express';
import { tap } from 'rxjs';

@Injectable()
export class SetCookieInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<{
      tokens: { accessToken: string; refreshToken: string } | undefined;
    }>();
    const response = ctx.getResponse<Response>();

    return next.handle().pipe(
      tap(() => {
        if (request.tokens) {
          response.cookie('accessToken', request.tokens.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
          });

          response.cookie('refreshToken', request.tokens.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
          });

          request.tokens = undefined;
        }
      }),
    );
  }
}
