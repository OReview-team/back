import {
  StringFieldOptional,
  UUIDFieldOptional,
} from '../../../decorators/field.decorators.ts';

export class CreateProgramDto {
  @UUIDFieldOptional({ nullable: true })
  watchProviderIds?: Uuid[];

  // 검색할 때 우리 DB에 있는 id를 볼까 아니면 TMDB에 있는 id를 볼까?
  // 둘 다 상관없긴 할 듯.
  @UUIDFieldOptional({ nullable: true })
  genreIds?: Uuid[];

  @StringFieldOptional()
  watchRegion?: string;
}
