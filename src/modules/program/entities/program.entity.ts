import { Column, Entity, OneToMany } from 'typeorm';

import { AbstractEntity } from '../../../common/abstract.entity.ts';
import { UseDto } from '../../../decorators/use-dto.decorator.ts';
import { ReviewEntity } from '../../review/entities/review.entity.ts';
import { ProgramDto } from '../dtos/program.dto.ts';

@Entity({ name: 'users' })
@UseDto(ProgramDto)
export class ProgramEntity extends AbstractEntity<ProgramDto> {
  @Column({ type: 'int' })
  originId!: number;

  @Column({ type: 'varchar' })
  name!: string;

  @Column({ type: 'varchar' })
  overview!: string;

  @Column({ type: 'timestamp', comment: '제작 국가' })
  originCountry!: Date;

  @Column({ type: 'varchar', comment: '원작 제목' })
  originName!: string;

  @Column({ type: 'varchar' })
  backdropPath!: string;

  @Column({ type: 'varchar' })
  posterPath!: string;

  @Column({ nullable: true, type: 'int', comment: '평균 평점' })
  voteAverage!: number | null;

  @Column({ nullable: true, type: 'int', comment: '평점 매긴 횟수' })
  voteCount!: number | null;

  @Column({ type: 'timestamp', comment: '개봉일' })
  releaseDate!: Date;

  @Column({ type: 'timestamp', comment: '첫 방영일' })
  firstAirDate!: Date;

  @OneToMany(() => ReviewEntity, (reviewEntity) => reviewEntity.program)
  reviews?: ReviewEntity[];
}
