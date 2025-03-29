import {
  DateField,
  DateFieldOptional,
  EnumField,
  NumberField,
  NumberFieldOptional,
  StringField,
  StringFieldOptional,
  UUIDField,
  UUIDFieldOptional,
} from '../../../decorators/field.decorators.ts';
import { ProgramEnumType } from '../consts/program-type.const.ts';
import type { ITmdbMovieList, ITmdbTvList } from './tmdb-program.interface.ts';

export class ProgramDto {
  @UUIDField()
  id!: Uuid;

  @DateField()
  createdAt!: Date;

  @DateFieldOptional()
  updatedAt?: Date | null;

  @DateFieldOptional()
  deletedAt?: Date | null;

  @EnumField(() => ProgramEnumType)
  programType!: ProgramEnumType;

  @NumberField()
  tmdbProgramId!: number;

  @StringField()
  name!: string;

  @StringField()
  overview!: string;

  @StringField()
  originCountry!: string;

  @StringFieldOptional({ nullable: true })
  backdropPath!: string | null;

  @StringField()
  posterPath!: string;

  @NumberFieldOptional({ nullable: true })
  voteAverage!: number | null;

  @NumberFieldOptional({ nullable: true })
  voteCount!: number | null;

  @DateFieldOptional()
  releaseDate!: Date | null;

  @DateFieldOptional()
  firstAirDate!: Date | null;

  @NumberFieldOptional({ isArray: true, nullable: true })
  genreIds?: Uuid[];

  @UUIDFieldOptional({ nullable: true })
  watchProviderIds?: Uuid[];

  constructor(
    program: ITmdbMovieList | ITmdbTvList,
    programType: ProgramEnumType,
    genreIds: Uuid[],
    watchProviderIds: Uuid[],
  ) {
    this.programType = programType;
    this.tmdbProgramId = program.id;
    this.name = 'title' in program ? program.title : program.name;
    this.overview = program.overview;
    this.originCountry =
      'origin_country' in program ? (program.origin_country[0] ?? '') : '';
    this.backdropPath = program.backdrop_path;
    this.posterPath = program.poster_path;
    this.voteAverage = program.vote_average;
    this.voteCount = program.vote_count;
    this.releaseDate =
      'release_date' in program ? new Date(program.release_date) : null;
    this.firstAirDate =
      'first_air_date' in program ? new Date(program.first_air_date) : null;
    this.genreIds = genreIds;
    this.watchProviderIds = watchProviderIds;
  }
}
