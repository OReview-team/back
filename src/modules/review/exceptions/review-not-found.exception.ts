import { NotFoundException } from '@nestjs/common';

export class ReviewNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super('error.reviewNotFound', error);
  }
}
