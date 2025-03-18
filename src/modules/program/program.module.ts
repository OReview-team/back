import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProgramEntity } from './entities/program.entity.ts';
import { ProgramController } from './program.controller.ts';
import { ProgramService } from './program.service.ts';

@Module({
  imports: [TypeOrmModule.forFeature([ProgramEntity])],
  controllers: [ProgramController],
  providers: [ProgramService],
})
export class ProgramModule {}
