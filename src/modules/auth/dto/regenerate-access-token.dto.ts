import { StringField } from '../../../decorators/field.decorators.ts';
import type { UserEntity } from '../../user/entities/user.entity';

export class RegenerateAccessTokenDto {
  @StringField()
  accessToken: string;

  @StringField()
  refreshToken: string;

  user: UserEntity;

  constructor(data: {
    accessToken: string;
    refreshToken: string;
    user: UserEntity;
  }) {
    this.accessToken = data.accessToken;
    this.refreshToken = data.refreshToken;
    this.user = data.user;
  }
}
