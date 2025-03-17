import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  Version,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import type { Request, Response } from 'express';

import { RoleType } from '../../constants/role-type.ts';
import { AuthUser } from '../../decorators/auth-user.decorator.ts';
import { Auth } from '../../decorators/http.decorators.ts';
import { UserDto } from '../user/dtos/user.dto.ts';
import { UserEntity } from '../user/entities/user.entity.ts';
import { UserService } from '../user/user.service.ts';
import { AuthService } from './auth.service.ts';
import type { IGoogleUser } from './dto/google-user.interface.ts';
import { LoginPayloadDto } from './dto/login-payload.dto.ts';
import { UserLoginDto } from './dto/user-login.dto.ts';
import { UserRegisterDto } from './dto/user-register.dto.ts';
import { setAuthCookies } from './utils/cookie.utils.ts';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: LoginPayloadDto,
    description: 'User info with access token',
  })
  async userLogin(
    @Body() userLoginDto: UserLoginDto,
    @Res() response: Response,
  ): Promise<void> {
    const userEntity = await this.authService.validateUser(userLoginDto);

    const tokens = await this.authService.createJwtToken(userEntity);

    setAuthCookies(response, tokens.accessToken, tokens.refreshToken);

    response.status(HttpStatus.OK).json({ message: '로그인 성공' });
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserDto, description: 'Successfully Registered' })
  async userRegister(
    @Body() userRegisterDto: UserRegisterDto,
    @Res() response: Response,
  ): Promise<void> {
    const userEntity = await this.userService.createUser(userRegisterDto);

    const tokens = await this.authService.createJwtToken(userEntity);

    setAuthCookies(response, tokens.accessToken, tokens.refreshToken);

    response.status(HttpStatus.OK).json({ message: 'Successfully Registered' });
  }

  @Version('1')
  @Get('me')
  @HttpCode(HttpStatus.OK)
  @Auth([RoleType.USER, RoleType.ADMIN])
  @ApiOkResponse({
    type: UserDto,
    description: '현재 로그인한 유저의 정보(비밀번호 제외)',
  })
  getCurrentUser(@AuthUser() user: UserEntity): UserDto {
    return user.toDto();
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth() {
    return HttpStatus.OK;
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOkResponse({ description: 'google Oauth register' })
  async googleAuthRedirect(
    @Req() req: Request & { user: IGoogleUser },
    @Res() response: Response,
  ): Promise<void> {
    const tokens = await this.authService.googleLogin(req.user);

    setAuthCookies(response, tokens.accessToken, tokens.refreshToken);

    response.status(HttpStatus.OK).json({ message: 'SNS 로그인 완료' });
  }
}
