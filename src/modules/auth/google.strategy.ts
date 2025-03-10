import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import type { Profile } from 'passport';
import type { VerifyCallback } from 'passport-google-oauth20';
import { Strategy } from 'passport-google-oauth20';

import type { IGoogleUser } from './dto/google-user.interface';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.OAUTH_GOOGLE_ID ?? '',
      clientSecret: process.env.OAUTH_GOOGLE_SECRET ?? '',
      callbackURL: process.env.OAUTH_GOOGLE_REDIRECT ?? '',
      scope: ['email', 'profile'],
      passReqToCallback: false,
    });
  }

  validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): void {
    const { name, emails, photos } = profile;
    const user: IGoogleUser = {
      email: emails?.[0]?.value ?? '',
      firstName: name?.givenName ?? '',
      lastName: name?.familyName ?? '',
      picture: photos?.[0]?.value ?? '',
      accessToken,
      refreshToken,
    };
    done(null, user);
  }
}
