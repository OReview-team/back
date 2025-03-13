import { StringField } from '../../../decorators/field.decorators.ts';

export class TokenPayloadDto {
  @StringField()
  accessToken: string;

  @StringField()
  refreshToken: string;

  constructor(data: { accessToken: string; refreshToken: string }) {
    this.accessToken = data.accessToken;
    this.refreshToken = data.refreshToken;
  }
}
