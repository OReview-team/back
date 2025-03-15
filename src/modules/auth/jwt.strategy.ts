import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import type { Request } from 'express';
import { Strategy } from 'passport-jwt';

import { TokenType } from '../../constants/token-type.ts';
import { ApiConfigService } from '../../shared/services/api-config.service.ts';
import type { UserEntity } from '../user/entities/user.entity.ts';
import { UserService } from '../user/user.service.ts';
import { AuthService } from './auth.service.ts';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ApiConfigService,
    private authService: AuthService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: (req) => (req as Request).cookies.accessToken as string,
      secretOrKey: configService.authConfig.publicKey,
    });
  }

  async validate(
    args: { userId: Uuid; type: TokenType },
    req: Request,
  ): Promise<UserEntity> {
    if (args.type === TokenType.ACCESS_TOKEN) {
      const user = await this.userService.findOne({
        id: args.userId as never,
      });

      if (!user) {
        throw new UnauthorizedException();
      }

      return user;
    }

    const refreshToken = req.cookies.refreshToken as string;

    if (!refreshToken) {
      throw new UnauthorizedException('refresh token이 존재하지 않습니다.');
    }

    const result = await this.authService.regenerateAccessToken(refreshToken);

    req.headers['access-token'] = result.accessToken;
    req.headers['refresh-token'] = result.refreshToken;

    return result.user;
  }
}
