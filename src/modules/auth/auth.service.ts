import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { validateHash } from '../../common/utils.ts';
import { RegisterProviderType } from '../../constants/register-provider-type.ts';
import { TokenType } from '../../constants/token-type.ts';
import { UserNotFoundException } from '../../exceptions/user-not-found.exception.ts';
import { UpdateUserDto } from '../../modules/user/dtos/update-user.dto.ts';
import { ApiConfigService } from '../../shared/services/api-config.service.ts';
import type { UserEntity } from '../user/entities/user.entity.ts';
import { UserService } from '../user/user.service.ts';
import type { IGoogleUser } from './dto/google-user.interface.ts';
import { TokenPayloadDto } from './dto/token-payload.dto.ts';
import type { UserLoginDto } from './dto/user-login.dto.ts';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ApiConfigService,
    private userService: UserService,
  ) {}

  async createJwtToken(user: UserEntity): Promise<TokenPayloadDto> {
    const tokens = new TokenPayloadDto({
      accessToken: await this.jwtService.signAsync(
        {
          userId: user.id,
          email: user.email,
          role: user.role,
          profileImage: user.profileImage,
          registerProvider: user.registerProvider,
          registerProviderToken: user.registerProviderToken,
          type: TokenType.ACCESS_TOKEN,
        },
        {
          privateKey: this.configService.authConfig.privateKey,
          expiresIn: this.configService.authConfig.jwtAccessTokenExpirationTime,
        },
      ),
      refreshToken: await this.jwtService.signAsync(
        {
          userId: user.id,
          expiredAt:
            this.configService.authConfig.jwtRefreshTokenExpirationTime,
          type: TokenType.REFRESH_TOKEN,
        },
        {
          privateKey: this.configService.authConfig.privateKey,
          expiresIn:
            this.configService.authConfig.jwtRefreshTokenExpirationTime,
        },
      ),
    });

    const userDto = new UpdateUserDto({
      refreshToken: tokens.refreshToken,
    } as UserEntity);

    await this.userService.updateUser(user.id, userDto);

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

  async googleLogin(googleUser: IGoogleUser): Promise<TokenPayloadDto> {
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

    return this.createJwtToken(user);
  }
}
