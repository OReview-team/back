import type { ProgramEntity } from 'modules/program/entities/program.entity.ts';

import { AbstractDto } from '../../../common/dto/abstract.dto.ts';
import {
  DateField,
  NumberField,
  NumberFieldOptional,
  StringField,
} from '../../../decorators/field.decorators.ts';

export class ProgramDto extends AbstractDto {
  @NumberField()
  originId!: number;

  @StringField()
  name!: string;

  @StringField()
  overview!: string;

  @StringField()
  originCountry!: Date;

  @StringField()
  backdropPath!: string;

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
    this.name = program.name;
    this.overview = program.overview;
    this.originCountry = program.originCountry;
  }
}
