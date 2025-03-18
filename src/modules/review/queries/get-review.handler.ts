import type { IQueryHandler } from '@nestjs/cqrs';
import { QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ReviewEntity } from '../entities/review.entity.ts';
import { GetReviewQuery } from './get-review.query.ts';

@QueryHandler(GetReviewQuery)
export class GetPostHandler implements IQueryHandler<GetReviewQuery> {
  constructor(
    @InjectRepository(ReviewEntity)
    private postRepository: Repository<ReviewEntity>,
  ) {}

  async execute(query: GetReviewQuery) {
    return this.postRepository.findBy({
      userId: query.userId as never,
    });
  }
}
