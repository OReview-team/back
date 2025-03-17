import type { IQuery } from '@nestjs/cqrs';

export class GetReviewQuery implements IQuery {
  constructor(public readonly userId: Uuid) {}
}
