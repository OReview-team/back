// program.mapper.ts

import { ProgramDto } from '../dtos/program.dto.ts';
import { ProgramEntity } from '../entities/program.entity.ts';
import { GenreEntity } from '../entities/genre.entity.ts';
import { WatchProviderEntity } from '../entities/watch-provider.entity.ts';

export function mapProgramDtoToEntity(
  programDto: ProgramDto,
  genreList: GenreEntity[],
  watchProvider?: WatchProviderEntity,
): ProgramEntity {
  const programEntity = new ProgramEntity();

  Object.assign(programEntity, {
    tmdbProgramId: programDto.tmdbProgramId,
    programType: programDto.programType,
    name: programDto.name,
    overview: programDto.overview,
    originCountry: programDto.originCountry,
    backdropPath: programDto.backdropPath,
    posterPath: programDto.posterPath,
    voteAverage: programDto.voteAverage,
    voteCount: programDto.voteCount,
    releaseDate: programDto.releaseDate,
    firstAirDate: programDto.firstAirDate,
    genres: genreList.filter((genre) =>
      programDto.genreIds?.includes(genre.id),
    ),
    watchProviders: watchProvider ? [watchProvider] : [],
  });

  return programEntity;
}
