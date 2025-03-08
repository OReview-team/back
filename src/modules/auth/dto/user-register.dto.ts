import {
  EmailField,
  PasswordField,
  StringField,
} from '../../../decorators/field.decorators.ts';

export class UserRegisterDto {
  @EmailField()
  readonly email!: string;

  @PasswordField({ minLength: 6 })
  readonly password!: string;

  @StringField()
  readonly nickName!: string;
}
