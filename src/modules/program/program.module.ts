import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GenreEntity } from './entities/genre.entity.ts';
import { ProgramEntity } from './entities/program.entity.ts';
import { WatchProviderEntity } from './entities/watch-provider.entity.ts';
import { ProgramController } from './program.controller.ts';
import { ProgramService } from './program.service.ts';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProgramEntity, GenreEntity, WatchProviderEntity]),
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  controllers: [ProgramController],
  providers: [
    ProgramService,
    {
      provide: 'TMDB_CONFIG',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const tmdbApiKey: string | undefined =
          configService.get<string>('TMDB_API_KEY');

        const tmdbUrl: string | undefined =
          configService.get<string>('TMDB_URL_BASE');

        const tmdbAccessToken: string | undefined =
          configService.get<string>('TMDB_ACCESS_TOKEN');

        if (!tmdbApiKey || !tmdbUrl || !tmdbAccessToken) {
          throw new Error(
            '환경 변수 입력이 되지 않았습니다. : TMDB_API_KEY or TMDB_URL_BASE or TMDB_ACCESS_TOKEN',
          );
        }

        return {
          tmdbApiKey,
          tmdbUrl,
          tmdbAccessToken,
        };
      },
    },
  ],
  exports: [HttpModule],
})
export class ProgramModule {}
