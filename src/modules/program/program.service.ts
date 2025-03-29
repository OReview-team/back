import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { HttpService } from '@nestjs/axios';

import type { CreateProgramDto } from './dtos/create-program.dto';
import { GenreEntity } from './entities/genre.entity.ts';
import { ProgramEntity } from './entities/program.entity.ts';
import { WatchProviderEntity } from './entities/watch-provider.entity.ts';

@Injectable()
export class ProgramService {
  constructor(
    @InjectRepository(ProgramEntity)
    private programRepository: Repository<ProgramEntity>,
    @InjectRepository(WatchProviderEntity)
    private watchProviderRepository: Repository<WatchProviderEntity>,
    @InjectRepository(GenreEntity)
    private genreRepository: Repository<GenreEntity>,
    @Inject('TMDB_CONFIG')
    private readonly tmdbConfig: { tmdbApiKey: string; tmdbUrl: string },
    private readonly httpService: HttpService,
  ) {}

  @Transactional()
  async createProgram(createProgramDto: CreateProgramDto) {
    // 먼저 들어온 Id가 있으면 DB에 있는지 확인하기
    const genreList = await this.genreRepository.find({
      where: { id: In(createProgramDto.genreIds ?? []) },
    });

    if (
      genreList.length > 0 ||
      genreList.length !== createProgramDto.genreIds?.length
    ) {
      throw new BadRequestException('입력한 genreId 가 일치하지 않습니다.');
    }

    const watchProviderList = await this.watchProviderRepository.find({
      where: { id: In(createProgramDto.watchProviderIds ?? []) },
    });

    if (
      watchProviderList.length > 0 ||
      watchProviderList.length !== createProgramDto.watchProviderIds?.length
    ) {
      throw new BadRequestException(
        '입력한 watchProviderId 가 일치하지 않습니다.',
      );
    }
    // ===== axios 같은 패키지 설치 후 해야할 것 ======
    // 1. api call 설정하기
    // 2. 비동기 api call package설치하기
    // 3. api call 되는지 확인하기

    // === 호출 성공 후 해야할 것 ===
    
  }

  @Transactional()
  async createGenreList(): Promise<GenreEntity[]> {
    try {
      // ===== API 호출부 =====
      const tvLocation = 'genre/tv/list';

      const movieLocation = 'genre/movie/list';

      const tvGenreList: Array<{ id: number; name: string }> = (
        await this.httpService.axiosRef.get(
          this.tmdbConfig.tmdbUrl + tvLocation,
          {
            headers: {
              Authorization: this.tmdbConfig.tmdbApiKey,
              accept: 'application/json',
            },
            params: {
              language: 'ko',
            },
          },
        )
      ).data.genres;

      const movieGenreList: Array<{ id: number; name: string }> = (
        await this.httpService.axiosRef.get(
          this.tmdbConfig.tmdbUrl + movieLocation,
          {
            headers: {
              Authorization: this.tmdbConfig.tmdbApiKey,
              accept: 'application/json',
            },
            params: {
              language: 'ko',
            },
          },
        )
      ).data.genres;

      // ===== API 호출부 =====

      const savedGenreList = await this.genreRepository.find();

      const notSavedGenreList: Array<{
        id: number;
        name: string;
        program: string;
      }> = [];

      tvGenreList.forEach((tvGenre) => {
        const savedTvGenreIdList = savedGenreList
          .filter((per) => per.program === 'TV')
          .map((genre) => genre.originId);
        if (!savedTvGenreIdList.includes(tvGenre.id)) {
          notSavedGenreList.push({ ...tvGenre, program: 'TV' });
        }
      });

      movieGenreList.forEach((movieGenre) => {
        const savedMovieGenreIdList = savedGenreList
          .filter((per) => per.program === 'MOVIE')
          .map((genre) => genre.originId);
        if (!savedMovieGenreIdList.includes(movieGenre.id)) {
          notSavedGenreList.push({ ...movieGenre, program: 'MOVIE' });
        }
      });

      if (notSavedGenreList.length > 0) {
        await this.genreRepository.save(
          notSavedGenreList.map((genre) => {
            return {
              originId: genre.id,
              name: genre.name,
              program: genre.program,
            };
          }),
        );
      }

      const genreList = await this.genreRepository.find();

      return genreList;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
