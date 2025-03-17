import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';

import { CreateReviewDto } from './dtos/create-review.dto.ts';
import type { UpdateReviewDto } from './dtos/update-review.dto.ts';
import { ReviewNotFoundException } from './exceptions/review-not-found.exception.ts';
import { ReviewEntity } from './review.entity.ts';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewEntity)
    private reviewRepository: Repository<ReviewEntity>,
  ) {}

  @Transactional()
  createReview(
    userId: Uuid,
    createReviewDto: CreateReviewDto,
  ): Promise<ReviewEntity> {
    createReviewDto.userId = userId;

    return this.reviewRepository.save(createReviewDto);
  }

  async getReviewList(): Promise<ReviewEntity[]> {
    const reviewList = await this.reviewRepository.find({
      relations: ['user'],
    });

    return reviewList;
  }

  async getSinglePost(id: Uuid): Promise<ReviewEntity> {
    const queryBuilder = this.reviewRepository
      .createQueryBuilder('review')
      .where('review.id = :id', { id });

    const reviewEntity = await queryBuilder.getOne();

    if (!reviewEntity) {
      throw new ReviewNotFoundException();
    }

    return reviewEntity;
  }

  async updatePost(id: Uuid, updateReviewDto: UpdateReviewDto): Promise<void> {
    const queryBuilder = this.reviewRepository
      .createQueryBuilder('review')
      .where('review.id = :id', { id });

    const reviewEntity = await queryBuilder.getOne();

    if (!reviewEntity) {
      throw new ReviewNotFoundException();
    }

    this.reviewRepository.merge(reviewEntity, updateReviewDto);

    await this.reviewRepository.save(updateReviewDto);
  }

  async deletePost(id: Uuid): Promise<void> {
    const queryBuilder = this.reviewRepository
      .createQueryBuilder('post')
      .where('post.id = :id', { id });

    const reviewEntity = await queryBuilder.getOne();

    if (!reviewEntity) {
      throw new ReviewNotFoundException();
    }

    await this.reviewRepository.remove(reviewEntity);
  }
}
