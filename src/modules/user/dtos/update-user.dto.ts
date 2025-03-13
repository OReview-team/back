import { AbstractDto } from '../../../common/dto/abstract.dto.ts';
import { RoleType } from '../../../constants/role-type.ts';
import {
  EmailFieldOptional,
  EnumFieldOptional,
  StringFieldOptional,
} from '../../../decorators/field.decorators.ts';
import type { UserEntity } from '../entities/user.entity.ts';

export class UpdateUserDto extends AbstractDto {
  @EmailFieldOptional({ nullable: true })
  email?: string | null;

  @StringFieldOptional({ nullable: true })
  nickName?: string;

  @EnumFieldOptional(() => RoleType)
  role?: RoleType;

  @StringFieldOptional({ nullable: true })
  refreshToken?: string;

  constructor(user: UserEntity) {
    super(user);
    this.email = user.email;
    this.nickName = user.nickName;
    this.role = user.role;
    this.refreshToken = user.refreshToken;
  }
}
