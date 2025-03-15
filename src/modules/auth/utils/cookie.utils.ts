import type { Response } from 'express';

export const setAuthCookies = (
  response: Response,
  accessToken: string,
  refreshToken: string,
) => {
  response.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });
  response.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });
};
