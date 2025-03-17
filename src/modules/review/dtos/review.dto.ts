import { ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/abstract.dto.ts';
import {
  DynamicTranslate,
  StaticTranslate,
} from '../../../decorators/translate.decorator.ts';
import type { ReviewEntity } from '../review.entity.ts';

export class ReviewDto extends AbstractDto {
  @ApiPropertyOptional()
  @DynamicTranslate()
  title?: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional()
  @StaticTranslate()
  info: string;

  constructor(postEntity: ReviewEntity) {
    super(postEntity);

    this.info = 'keywords.admin';
  }
}
