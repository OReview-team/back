import type { ICommand } from '@nestjs/cqrs';

import type { CreateReviewDto } from '../dtos/create-review.dto.ts';

export class CreateReviewCommand implements ICommand {
  constructor(
    public readonly userId: Uuid,
    public readonly createPostDto: CreateReviewDto,
  ) {}
}
