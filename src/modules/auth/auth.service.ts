import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { validateHash } from '../../common/utils.ts';
import { RegisterProviderType } from '../../constants/register-provider-type.ts';
import { RoleType } from '../../constants/role-type.ts';
import { TokenType } from '../../constants/token-type.ts';
import { UserNotFoundException } from '../../exceptions/user-not-found.exception.ts';
import { UpdateUserDto } from '../../modules/user/dtos/update-user.dto.ts';
import { ApiConfigService } from '../../shared/services/api-config.service.ts';
import type { UserEntity } from '../user/entities/user.entity.ts';
import { UserService } from '../user/user.service.ts';
import type { IGoogleUser } from './dto/google-user.interface.ts';
import { LoginPayloadDto } from './dto/login-payload.dto.ts';
import type { IRefreshTokenPayload } from './dto/refresh-token.interface.ts';
import type { RegenerateAccessTokenDto } from './dto/regenerate-access-token.dto.ts';
import { TokenPayloadDto } from './dto/token-payload.dto.ts';
import type { UserLoginDto } from './dto/user-login.dto.ts';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ApiConfigService,
    private userService: UserService,
  ) {}

  async createJwtToken(data: {
    userId: Uuid;
    email: string;
    role: RoleType;
    profileImage: string;
    registerProvider?: string;
    registerProviderToken?: string;
  }): Promise<TokenPayloadDto> {
    const tokens = new TokenPayloadDto({
      accessToken: await this.jwtService.signAsync({
        userId: data.userId,
        email: data.email,
        role: data.role,
        profileImage: data.profileImage,
        registerProvider: data.registerProvider,
        registerProviderToken: data.registerProviderToken,
        type: TokenType.ACCESS_TOKEN,
      }),
      refreshToken: await this.jwtService.signAsync({
        userId: data.userId,
        expiredAt: this.configService.authConfig.jwtRefreshTokenExpirationTime,
        type: TokenType.REFRESH_TOKEN,
      }),
    });

    const userDto = new UpdateUserDto({
      refreshToken: tokens.refreshToken,
    } as UserEntity);

    await this.userService.updateUser(data.userId, userDto);

    return tokens;
  }

  async validateUser(userLoginDto: UserLoginDto): Promise<UserEntity> {
    const user = await this.userService.findOne({
      email: userLoginDto.email,
    });

    const isPasswordValid = await validateHash(
      userLoginDto.password,
      user?.password,
    );

    if (!isPasswordValid) {
      throw new UserNotFoundException();
    }

    return user!;
  }

  async googleLogin(googleUser: IGoogleUser): Promise<LoginPayloadDto> {
    const { email, picture, firstName, lastName, accessToken } = googleUser;
    let user = await this.userService.findOne({ email });

    if (!user) {
      user = await this.userService.createSocialUser({
        email,
        nickName: `${firstName}${lastName}`, // 자동으로 닉네임을 구글에서 제공하는 이름과 성을 조합했지만 개인정보이므로 무작위 닉네임 혹은 nickName을 nullable로 만들어줄 예정
        profileImage: picture,
        registerProvider: RegisterProviderType.GOOGLE,
        registerProviderToken: accessToken,
      });
    }

    const token = await this.createJwtToken({
      userId: user.id,
      email,
      role: user.role,
      profileImage: user.profileImage,
      registerProvider: RegisterProviderType.GOOGLE,
      registerProviderToken: accessToken,
    });

    return new LoginPayloadDto(user, token);
  }

  async regenerateAccessToken(
    refreshToken: string,
  ): Promise<RegenerateAccessTokenDto> {
    try {
      const decodedToken = this.jwtService.verify<IRefreshTokenPayload>(
        refreshToken,
        {
          secret: process.env.JWT_REFRESH_SECRET,
        },
      );

      if (decodedToken.type !== TokenType.REFRESH_TOKEN) {
        throw new ForbiddenException('refresh token 타입이 일치하지 않습니다.');
      }

      const user = await this.userService.findOne({
        id: decodedToken.userId,
        refreshToken,
      });

      if (!user) {
        throw new ForbiddenException('유효하지 않은 refresh token입니다.');
      }

      if (user.refreshToken !== refreshToken) {
        throw new ForbiddenException('refresh token이 일치하지 않습니다.');
      }

      const tokens = await this.createJwtToken({
        userId: user.id,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
        registerProvider: user.registerProvider,
        registerProviderToken: user.registerProviderToken,
      });

      return {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        user,
      };
    } catch {
      throw new ForbiddenException('Invalid refresh token');
    }
  }
}
