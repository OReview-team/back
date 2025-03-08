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
  readonly registerProvider?: string;

  @StringFieldOptional()
  readonly registerProviderToken?: string;

  @StringFieldOptional()
  readonly profileImage?: string;
}
