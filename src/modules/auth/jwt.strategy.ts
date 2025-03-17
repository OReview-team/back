import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import type { Request } from 'express';
import jwt from 'jsonwebtoken';
import { Strategy } from 'passport-jwt';

import { ApiConfigService } from '../../shared/services/api-config.service.ts';
import type { UserEntity } from '../user/entities/user.entity.ts';
import { UserService } from '../user/user.service.ts';
import { AuthService } from './auth.service.ts';
import type {
  IAccessTokenPayload,
  IRefreshTokenPayload,
} from './dto/refresh-token.interface.ts';

interface IRequestTokens extends Request {
  regeneratedTokens?: { accessToken: string; refreshToken: string };
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ApiConfigService,
    private authService: AuthService,
    private userService: UserService,
  ) {
    super({
      // passport는 jwtFromRequest와 secretOrKey가 필수이기 때문에 여기서 access token을 추출할 경우
      // access token이 만료되면 잡을 방법이 없어 해당 로직에서 refreshToken을 잡는다.
      jwtFromRequest: (request) =>
        (request as Request).cookies.refreshToken as string,
      ignoreExpiration: false,
      secretOrKey: configService.authConfig.publicKey,
      passReqToCallback: true,
    });
  }

  async validate(
    args: { cookies: { accessToken: string; refreshToken: string } },
    request: IRequestTokens,
    done: (error: Error | null, user?: UserEntity) => void,
  ): Promise<void> {
    let user: UserEntity | null = null;

    try {
      // 1. access token 검증
      const accessToken = args.cookies.accessToken;

      let accessTokenPayload: IAccessTokenPayload;

      try {
        accessTokenPayload = jwt.verify(
          accessToken,
          this.configService.authConfig.publicKey,
        ) as IAccessTokenPayload;

        user = await this.userService.findOne({
          id: accessTokenPayload.userId as never,
        });

        if (user) {
          request.user = user;
        }
      } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
          // 2. access token 만료된 경우 여기서 refresh token 검증
          const refreshToken = args.cookies.refreshToken;

          if (!refreshToken) {
            throw new UnauthorizedException(
              'refresh token이 존재하지 않습니다.',
            );
          }

          const refreshTokenPayload = jwt.verify(
            refreshToken,
            this.configService.authConfig.privateKey,
          ) as IRefreshTokenPayload;

          if (refreshTokenPayload.expiresAt < new Date()) {
            throw new UnauthorizedException(
              'refresh token이 만료되었습니다. 다시 로그인해주세요.',
            );
          }

          user = await this.userService.findOne({
            id: refreshTokenPayload.userId,
          });

          if (user) {
            request.user = user;

            // 3. refresh token 검증에 성공했다면 access token과 refresh token 모두 재 발급
            // jwt strategy에서 res는 undefined이기 때문에(접근할 수 없는것으로 추정) req.newTokens에 임시저장한다.
            // 이 다음 로직인 interceptor에서 cookie를 세팅할 예정.
            request.regeneratedTokens =
              await this.authService.createJwtToken(user);

            done(null, user);

            return;
          }

          throw new UnauthorizedException(
            'refresh token으로 해당 유저를 찾을 수 없었습니다.',
          );
        }
      }
    } catch {
      throw new UnauthorizedException();
    }
  }
}
