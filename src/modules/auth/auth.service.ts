import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { validateHash } from '../../common/utils.ts';
import { RegisterProviderType } from '../../constants/register-provider-type.ts';
import { RoleType } from '../../constants/role-type.ts';
import { TokenType } from '../../constants/token-type.ts';
import { UserNotFoundException } from '../../exceptions/user-not-found.exception.ts';
import { ApiConfigService } from '../../shared/services/api-config.service.ts';
import type { UserEntity } from '../user/user.entity.ts';
import { UserService } from '../user/user.service.ts';
import type { IGoogleUser } from './dto/google-user.interface.ts';
import { LoginPayloadDto } from './dto/login-payload.dto.ts';
import { TokenPayloadDto } from './dto/token-payload.dto.ts';
import type { UserLoginDto } from './dto/user-login.dto.ts';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ApiConfigService,
    private userService: UserService,
  ) {}

  async createAccessToken(data: {
    userId: Uuid;
    email: string;
    role: RoleType;
    profileImage: string;
    registerProvider?: string;
    registerProviderToken?: string;
  }): Promise<TokenPayloadDto> {
    return new TokenPayloadDto({
      expiresIn: this.configService.authConfig.jwtExpirationTime,
      accessToken: await this.jwtService.signAsync({
        userId: data.userId,
        email: data.email,
        role: data.role,
        profileImage: data.profileImage,
        registerProvider: data.registerProvider,
        registerProviderToken: data.registerProviderToken,
        type: TokenType.ACCESS_TOKEN,
      }),
    });
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
        nickName: `${firstName}${lastName}`,
        profileImage: picture,
        registerProvider: RegisterProviderType.GOOGLE,
        registerProviderToken: accessToken,
      });
    }

    const token = await this.createAccessToken({
      userId: user.id,
      email,
      role: user.role,
      profileImage: user.profileImage,
      registerProvider: RegisterProviderType.GOOGLE,
      registerProviderToken: accessToken,
    });

    return new LoginPayloadDto(user, token);
  }
}
