import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { HttpService } from '@nestjs/axios';

import type { CreateProgramDto } from './dtos/create-program.dto';
import { GenreEntity } from './entities/genre.entity.ts';
import { ProgramEntity } from './entities/program.entity.ts';
import { WatchProviderEntity } from './entities/watch-provider.entity.ts';
import {
  WatchProviderResponseDto,
  type ITmdbWatchProvider,
} from './dtos/tmdb-watch-providers-response.interface.ts';
import type { WatchProviderDto } from './dtos/watch-provider.dto.ts';

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
    // 1. 검색하기
    // 2. 검색 결과로
    // ===== axios 같은 패키지 설치 후 해야할 것 ======
    // 1. api call 설정하기
    // 2. 비동기 api call package설치하기
    // 3. api call 되는지 확인하기
    // === 호출 성공 후 해야할 것 ===
  }

  /**
   * 거의 일회성 API - 삭제해도 될 것 같지만 일단 놔둠, movie만 호출한 이유는 tv와 값이 다르지 않아서
   * 중복된 내용이라 한 가지만 검색
   * @returns 저장된 OTT 서비스 배열
   */
  async createWatchProviders(): Promise<WatchProviderDto[]> {
    try {
      const movieWatchProvidersUrl = `${this.tmdbConfig.tmdbUrl}watch/providers/movie`;

      const movieResponse = await this.httpService.axiosRef.get(
        movieWatchProvidersUrl,
        {
          params: {
            api_key: this.tmdbConfig.tmdbApiKey,
            watch_region: 'KR',
          },
        },
      );

      // API 반환 값을 변수에 할당 후 DB에 저장될 수 있도록 DTO로 인스턴스를 생성해 값을 변환해준다.
      const movieWatchProviders: ITmdbWatchProvider[] =
        movieResponse?.data.results ?? [];

      const existingWatchProviderList =
        await this.watchProviderRepository.find();

      const movieWatchProvidersDtos: WatchProviderResponseDto[] = [];
      if (movieWatchProviders.length > 0) {
        movieWatchProviders.forEach((provider) => {
          const existingWatchProvider = existingWatchProviderList.find(
            (per) => per.tmdbProviderId === provider.provider_id,
          );
          if (!existingWatchProvider) {
            movieWatchProvidersDtos.push(
              new WatchProviderResponseDto(provider),
            );
          }
        });
      }

      // 변환된 값을 저장해줌
      const savedWatchProviders = await Promise.all([
        this.watchProviderRepository.save(movieWatchProvidersDtos),
      ]);

      return savedWatchProviders.flat();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  @Transactional()
  async createGenres(): Promise<GenreEntity[]> {
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
