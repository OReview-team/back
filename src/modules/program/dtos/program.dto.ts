import type { ProgramEntity } from 'modules/program/entities/program.entity.ts';

import { AbstractDto } from '../../../common/dto/abstract.dto.ts';
import {
  DateField,
  NumberField,
  NumberFieldOptional,
  StringField,
  UUIDFieldOptional,
} from '../../../decorators/field.decorators.ts';

export class ProgramDto extends AbstractDto {
  @NumberField()
  tmdbProgramId!: number;

  @StringField()
  name!: string;

  @StringField()
  overview!: string;

  @StringField()
  originCountry!: string;

  @StringField()
  backdropPath!: string;

  @StringField()
  posterPath!: string;

  @NumberFieldOptional({ nullable: true })
  voteAverage!: number | null;

  @NumberFieldOptional({ nullable: true })
  voteCount!: number | null;

  @DateField()
  releaseDate!: Date;

  @DateField()
  firstAirDate!: Date;

  @NumberFieldOptional({ isArray: true, nullable: true })
  genreIds?: Uuid[];

  @UUIDFieldOptional({ nullable: true })
  watchProviderIds?: Uuid[];

  constructor(program: ProgramEntity) {
    super(program);
    this.tmdbProgramId = program.tmdbProgramId;
    this.name = program.name;
    this.overview = program.overview;
    this.originCountry = program.originCountry;
    this.backdropPath = program.backdropPath;
    this.posterPath = program.posterPath;
    this.voteAverage = program.voteAverage;
    this.voteCount = program.voteCount;
    this.releaseDate = program.releaseDate;
    this.firstAirDate = program.firstAirDate;
    this.genreIds = program.genres.map((genre) => genre.id);
    this.watchProviderIds = program.watchProviders.map(
      (watchProvider) => watchProvider.id,
    );
  }
}
