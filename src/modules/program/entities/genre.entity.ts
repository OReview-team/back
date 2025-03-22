import { Column, Entity, ManyToMany } from 'typeorm';

import { AbstractEntity } from '../../../common/abstract.entity.ts';
import { UseDto } from '../../../decorators/use-dto.decorator.ts';
import { GenreDto } from '../dtos/genre.dto.ts';
import { ProgramEntity } from './program.entity.ts';

@Entity({ name: 'genres' })
@UseDto(GenreDto)
export class GenreEntity extends AbstractEntity<GenreDto> {
  @Column({ type: 'int', comment: 'TMDB에서 제공하는 id' })
  originId!: number;

  @Column({ type: 'varchar' })
  name!: string;

  @Column({ type: 'varchar', comment: 'TV OR MOVIE' })
  program!: string;

  @ManyToMany(() => ProgramEntity, (program) => program.genres)
  programs!: ProgramEntity[];
}
