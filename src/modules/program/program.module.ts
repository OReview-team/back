import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GenreEntity } from './entities/genre.entity.ts';
import { ProgramEntity } from './entities/program.entity.ts';
import { WatchProviderEntity } from './entities/watch-provider.entity.ts';
import { ProgramController } from './program.controller.ts';
import { ProgramService } from './program.service.ts';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProgramEntity, GenreEntity, WatchProviderEntity]),
  ],
  controllers: [ProgramController],
  providers: [ProgramService],
})
export class ProgramModule {}
