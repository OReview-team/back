import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity.ts';
import { RoleType } from '../../constants/role-type.ts';
import { UseDto } from '../../decorators/use-dto.decorator.ts';
import type { UserDtoOptions } from './dtos/user.dto.ts';
import { UserDto } from './dtos/user.dto.ts';

@Entity({ name: 'users' })
@UseDto(UserDto)
export class UserEntity extends AbstractEntity<UserDto, UserDtoOptions> {
  @Column({ unique: true, nullable: false, type: 'varchar' })
  email!: string;

  @Column({ nullable: true, type: 'varchar' })
  password?: string | null;

  @Column({ nullable: false, type: 'varchar' })
  nickName!: string;

  @Column({ nullable: true, type: 'varchar' })
  refreshToken!: string;

  @Column({ nullable: true, type: 'varchar' })
  registerProvider!: string;

  @Column({ nullable: true, type: 'varchar', comment: 'SNS token' })
  registerProviderToken!: string;

  @Column({ nullable: true, type: 'varchar', comment: 'SNS token' })
  profileImage!: string;

  @Column({ type: 'enum', enum: RoleType, default: RoleType.USER })
  role!: RoleType;
}
