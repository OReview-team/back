import { IsOptional, IsPhoneNumber } from 'class-validator';
import {
  EmailField,
  PasswordField,
  StringField,
} from '../../../decorators/field.decorators.ts';

export class UserRegisterDto {
  @StringField()
  readonly firstName!: string;

  @StringField()
  readonly lastName!: string;

  @EmailField()
  readonly email!: string;

  @PasswordField({ minLength: 6 })
  readonly password!: string;

  @IsPhoneNumber()
  @IsOptional()
  phone?: string;
}
