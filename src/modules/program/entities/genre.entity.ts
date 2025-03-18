import { Column, Entity, ManyToMany } from 'typeorm';

import { AbstractEntity } from '../../../common/abstract.entity.ts';
import { UseDto } from '../../../decorators/use-dto.decorator.ts';
import { ProgramDto } from '../dtos/program.dto.ts';
import { ProgramEntity } from './program.entity.ts';

@Entity({ name: 'genres' })
@UseDto(ProgramDto)
export class GenreEntity extends AbstractEntity<ProgramDto> {
  @Column({ type: 'int' })
  originId!: number;

  @Column({ type: 'varchar' })
  name!: string;

  @ManyToMany(() => ProgramEntity, (program) => program.genres)
  programs!: ProgramEntity[];
}
