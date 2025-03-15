import type { RoleType } from 'constants/role-type';
import type { TokenType } from 'constants/token-type';

export interface IRefreshTokenPayload {
  userId: Uuid;
  type: TokenType;
  expiresAt: Date;
  exp: number;
  iat: number;
}

export interface IAccessTokenPayload {
  userId: Uuid;
  email: string;
  role: RoleType;
  profileImage?: string;
  registerProvider?: string;
  registerProviderToken?: string;
  type: TokenType;
  exp: number;
  iat: number;
}
