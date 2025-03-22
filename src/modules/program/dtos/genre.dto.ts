import { AbstractDto } from '../../../common/dto/abstract.dto.ts';
import {
  NumberField,
  StringField,
} from '../../../decorators/field.decorators.ts';
import type { GenreEntity } from '../entities/genre.entity.ts';

export class GenreDto extends AbstractDto {
  @NumberField()
  originId!: number;

  @StringField()
  name!: string;

  constructor(genre: GenreEntity) {
    super(genre);
    this.originId = genre.originId;
    this.name = genre.name;
  }
}
