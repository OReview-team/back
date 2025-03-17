import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// import { CreatePostHandler } from './commands/create-post.handler.ts';
import { ReviewController } from './review.controller.ts';
import { ReviewEntity } from './review.entity.ts';
import { ReviewService } from './review.service.ts';
// import { GetPostHandler } from './queries/get-review.handler.ts';

// const handlers = [CreatePostHandler, GetPostHandler];

@Module({
  imports: [TypeOrmModule.forFeature([ReviewEntity])],
  providers: [ReviewService],
  controllers: [ReviewController],
})
export class ReviewModule {}
