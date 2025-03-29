import { Controller, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';

import { RoleType } from '../../constants/role-type.ts';
import { Auth } from '../../decorators/http.decorators.ts';
import { CreateProgramDto } from './dtos/create-program.dto.ts';
import { ProgramDto } from './dtos/program.dto.ts';
import { ProgramService } from './program.service.ts';
import type { WatchProviderDto } from './dtos/watch-provider.dto.ts';

@Controller('program')
export class ProgramController {
  constructor(private programService: ProgramService) {}

  @Post()
  @Auth([RoleType.ADMIN])
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: ProgramDto })
  async createProgram(@Param() createProgramDto: CreateProgramDto) {
    await this.programService.createProgram(createProgramDto);
  }

  @Post('genre')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse()
  async createGenreList() {
    return await this.programService.createGenres();
  }

  @Post('watch_provider')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse()
  async createWatchProviders(): Promise<WatchProviderDto[]> {
    return await this.programService.createWatchProviders();
  }
}
