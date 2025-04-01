import { AbstractDto } from '../../../common/dto/abstract.dto.ts';
import {
  EnumField,
  NumberField,
  StringField,
} from '../../../decorators/field.decorators.ts';
import type { GenreEntity } from '../entities/genre.entity.ts';

export enum GenreProgramType {
  TV = 'TV',
  MOVIE = 'MOVIE',
}
export class GenreDto extends AbstractDto {
  @NumberField()
  originId!: number;

  @StringField()
  name!: string;

  @EnumField(() => GenreProgramType)
  program!: GenreProgramType;

  constructor(genre: GenreEntity) {
    super(genre);
    this.originId = genre.originId;
    this.name = genre.name;
  }
}
