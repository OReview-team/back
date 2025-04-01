import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';

import { CreateProgramDto } from './dtos/create-program.dto.ts';
import { ProgramDto } from './dtos/program.dto.ts';
import type { WatchProviderDto } from './dtos/watch-provider.dto.ts';
import { ProgramService } from './program.service.ts';

@Controller('program')
export class ProgramController {
  constructor(private programService: ProgramService) {}

  @Post()
  //   @Auth([RoleType.ADMIN])
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: ProgramDto })
  async createProgram(@Body() createProgramDto: CreateProgramDto) {
    await this.programService.createProgram(createProgramDto);
  }

  @Post('genre')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse()
  async createGenreList() {
    return this.programService.createGenres();
  }

  @Post('watch_provider')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse()
  async createWatchProviders(): Promise<WatchProviderDto[]> {
    return this.programService.createWatchProviders();
  }
}
