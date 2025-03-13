import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { FindOptionsWhere } from 'typeorm';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';

import { RoleType } from '../../constants/role-type.ts';
import { UserNotFoundException } from '../../exceptions/user-not-found.exception.ts';
import { SocialUserRegisterDto } from '../auth/dto/social-user-register.dto.ts';
import { UserRegisterDto } from '../auth/dto/user-register.dto.ts';
import type { UpdateUserDto } from './dtos/update-user.dto.ts';
import type { UserDto } from './dtos/user.dto.ts';
import { UserEntity } from './entities/user.entity.ts';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  /**
   * Find single user
   */
  findOne(findData: FindOptionsWhere<UserEntity>): Promise<UserEntity | null> {
    return this.userRepository.findOneBy(findData);
  }

  findByUsernameOrEmail(
    options: Partial<{ username: string; email: string }>,
  ): Promise<UserEntity | null> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    if (options.email) {
      queryBuilder.orWhere('user.email = :email', {
        email: options.email,
      });
    }

    if (options.username) {
      queryBuilder.orWhere('user.username = :username', {
        username: options.username,
      });
    }

    return queryBuilder.getOne();
  }

  @Transactional()
  async createUser(userRegisterDto: UserRegisterDto): Promise<UserEntity> {
    const user = this.userRepository.create(userRegisterDto);
    user.role = RoleType.USER;
    const userEntity = await this.userRepository.save(user);

    return userEntity;
  }

  @Transactional()
  async createSocialUser(socialUserRegisterDto: SocialUserRegisterDto) {
    const user = this.userRepository.create(socialUserRegisterDto);
    user.role = RoleType.USER;
    await this.userRepository.save(user);

    return user;
  }

  async getUser(userId: Uuid): Promise<UserDto> {
    const userEntity = await this.userRepository.findOne({
      where: { id: userId },
      select: ['email', 'nickName', 'role'],
    });

    if (!userEntity) {
      throw new UserNotFoundException();
    }

    return userEntity;
  }

  async updateUser(userId: Uuid, userDto: UpdateUserDto): Promise<UserDto> {
    const userEntity = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!userEntity) {
      throw new UserNotFoundException();
    }

    for (const [key, value] of Object.entries(userDto)) {
      if (value !== undefined) {
        userEntity[key as keyof UserEntity] = value as never;
      }
    }

    await this.userRepository.save(userEntity);

    return userEntity;
  }
}
