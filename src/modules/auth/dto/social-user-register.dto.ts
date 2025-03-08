import type { RegisterProviderType } from 'constants/register-provider-type.ts';

import {
  EmailField,
  StringField,
  StringFieldOptional,
} from '../../../decorators/field.decorators.ts';

export class SocialUserRegisterDto {
  @EmailField()
  readonly email!: string;

  @StringField()
  readonly nickName!: string;

  @StringFieldOptional()
  readonly registerProvider?: RegisterProviderType;

  @StringFieldOptional()
  readonly registerProviderToken?: string;

  @StringFieldOptional()
  readonly profileImage?: string;
}
