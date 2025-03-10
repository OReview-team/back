import {
  EmailField,
  PasswordField,
  StringField,
  StringFieldOptional,
} from '../../../decorators/field.decorators.ts';

export class UserRegisterDto {
  @EmailField()
  readonly email!: string;

  @PasswordField({ minLength: 6 })
  readonly password!: string;

  @StringField()
  readonly nickName!: string;

  @StringFieldOptional()
  readonly profileImage?: string;
}
