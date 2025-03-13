import type { TokenType } from 'constants/token-type';

export interface IRefreshTokenPayload {
  userId: Uuid;
  type: TokenType;
  expiresAt: Date;
  exp: number;
  iat: number;
}
