import type { Relation } from 'typeorm';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { AbstractEntity } from '../../../common/abstract.entity.ts';
import { UseDto } from '../../../decorators/use-dto.decorator.ts';
import { ProgramEntity } from '../../program/entities/program.entity.ts';
import { UserEntity } from '../../user/entities/user.entity.ts';
import { ReviewDto } from '../dtos/review.dto.ts';

@Entity({ name: 'reviews' })
@UseDto(ReviewDto)
export class ReviewEntity extends AbstractEntity<ReviewDto> {
  @Column({ type: 'uuid' })
  userId!: Uuid;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.reviews, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user!: Relation<UserEntity>;

  @ManyToOne(() => ProgramEntity, (programEntity) => programEntity.reviews, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'program_id' })
  program!: Relation<ProgramEntity>;
}
