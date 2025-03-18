import type { ProgramEntity } from 'modules/program/entities/program.entity.ts';

import { AbstractDto } from '../../../common/dto/abstract.dto.ts';
import {
  DateField,
  NumberFieldOptional,
  StringField,
} from '../../../decorators/field.decorators.ts';

export class ProgramDto extends AbstractDto {
  @StringField()
  title!: string;

  @StringField()
  overview!: string;

  @StringField()
  originCountry!: Date;

  @StringField()
  posterPath!: string;

  @NumberFieldOptional({ nullable: true })
  voteAverage!: number | null;

  @NumberFieldOptional({ nullable: true })
  voteCount!: string;

  @DateField()
  releaseDate!: Date;

  @DateField()
  firstAirDate!: Date;

  constructor(program: ProgramEntity) {
    super(program);
    this.title = program.title;
    this.overview = program.overview;
    this.originCountry = program.originCountry;
  }
}
