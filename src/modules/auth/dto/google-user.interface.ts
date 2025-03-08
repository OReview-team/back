export interface IGoogleUser {
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  picture: string | null;
  accessToken: string;
  refreshToken: string;
}
