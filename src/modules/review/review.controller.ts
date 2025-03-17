import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { RoleType } from '../../constants/role-type.ts';
import { ApiPageResponse } from '../../decorators/api-page-response.decorator.ts';
import { AuthUser } from '../../decorators/auth-user.decorator.ts';
import { Auth, UUIDParam } from '../../decorators/http.decorators.ts';
import { UseLanguageInterceptor } from '../../interceptors/language-interceptor.service.ts';
import { UserEntity } from '../user/entities/user.entity.ts';
import { CreateReviewDto } from './dtos/create-review.dto.ts';
import { ReviewDto } from './dtos/review.dto.ts';
import { UpdateReviewDto } from './dtos/update-review.dto.ts';
import type { ReviewEntity } from './entities/review.entity.ts';
import { ReviewService } from './review.service.ts';

@Controller('reviews')
@ApiTags('reviews')
export class ReviewController {
  constructor(private postService: ReviewService) {}

  @Post()
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: ReviewDto })
  async createReview(
    @Body() createReviewDto: CreateReviewDto,
    @AuthUser() user: UserEntity,
  ) {
    const reviewEntity = await this.postService.createReview(
      user.id,
      createReviewDto,
    );

    return reviewEntity.toDto();
  }

  @Get()
  @Auth([RoleType.USER])
  @UseLanguageInterceptor()
  @ApiPageResponse({ type: ReviewDto })
  async getReviewList(): Promise<ReviewEntity[]> {
    return this.postService.getReviewList();
  }

  @Get(':id')
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: ReviewDto })
  async getSinglePost(@UUIDParam('id') id: Uuid): Promise<ReviewDto> {
    const entity = await this.postService.getSinglePost(id);

    return entity.toDto();
  }

  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiAcceptedResponse()
  updatePost(
    @UUIDParam('id') id: Uuid,
    @Body() updatePostDto: UpdateReviewDto,
  ): Promise<void> {
    return this.postService.updatePost(id, updatePostDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiAcceptedResponse()
  async deletePost(@UUIDParam('id') id: Uuid): Promise<void> {
    await this.postService.deletePost(id);
  }
}
