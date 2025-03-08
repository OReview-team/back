import { AbstractDto } from '../../../common/dto/abstract.dto.ts';
import { RoleType } from '../../../constants/role-type.ts';
import {
  EmailFieldOptional,
  EnumFieldOptional,
  StringFieldOptional,
} from '../../../decorators/field.decorators.ts';
import type { UserEntity } from '../user.entity.ts';

export type UserDtoOptions = Partial<{ isActive: boolean }>;

export class UserDto extends AbstractDto {
  @EmailFieldOptional({ nullable: true })
  email?: string | null;

  @StringFieldOptional({ nullable: true })
  nickName!: string;

  @EnumFieldOptional(() => RoleType)
  role?: RoleType;

  constructor(user: UserEntity) {
    super(user);
    this.email = user.email;
    this.nickName = user.nickName;
    this.role = user.role;
  }
}
