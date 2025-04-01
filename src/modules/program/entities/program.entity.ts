import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

import { AbstractEntity } from '../../../common/abstract.entity.ts';
import { UseDto } from '../../../decorators/use-dto.decorator.ts';
import { ReviewEntity } from '../../review/entities/review.entity.ts';
import type { ProgramEnumType } from '../consts/program-type.const.ts';
import { ProgramDto } from '../dtos/program.dto.ts';
import { GenreEntity } from './genre.entity.ts';
import { WatchProviderEntity } from './watch-provider.entity.ts';

@Entity({ name: 'programs' })
@UseDto(ProgramDto)
export class ProgramEntity extends AbstractEntity<ProgramDto> {
  @Column({ type: 'int', comment: 'TMDB에서 제공하는 id' })
  tmdbProgramId!: number;

  @Column({ type: 'varchar', comment: 'movie or tv' })
  programType!: ProgramEnumType;

  @Column({ type: 'varchar' })
  name!: string;

  @Column({ type: 'varchar' })
  overview!: string;

  @Column({ type: 'varchar', comment: '원작 제목' })
  originName!: string;

  @Column({ type: 'varchar' })
  backdropPath!: string;

  @Column({ type: 'varchar' })
  posterPath!: string;

  @Column({ nullable: true, type: 'double precision', comment: '평균 평점' })
  voteAverage!: number | null;

  @Column({ nullable: true, type: 'int', comment: '평점 매긴 횟수' })
  voteCount!: number | null;

  @Column({ type: 'timestamp', comment: '개봉일' })
  releaseDate!: Date;

  @Column({ type: 'timestamp', comment: '첫 방영일' })
  firstAirDate!: Date;

  @OneToMany(() => ReviewEntity, (reviewEntity) => reviewEntity.program)
  reviews?: ReviewEntity[];

  @ManyToMany(() => GenreEntity, (genre) => genre.programs)
  @JoinTable({
    name: 'genres_programs',
    joinColumn: { name: 'program_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'genre_id', referencedColumnName: 'id' },
  })
  genres!: GenreEntity[];

  @ManyToMany(
    () => WatchProviderEntity,
    (watchProvider) => watchProvider.programs,
  )
  @JoinTable({
    name: 'watch_providers_programs',
    joinColumn: { name: 'program_id', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'watch_provider_id',
      referencedColumnName: 'id',
    },
  })
  watchProviders!: WatchProviderEntity[];
}
