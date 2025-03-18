import { AbstractDto } from '../../../common/dto/abstract.dto.ts';
import {
  NumberField,
  NumberFieldOptional,
  StringField,
} from '../../../decorators/field.decorators.ts';
import type { GenreEntity } from '../entities/genre.entity.ts';

export class GenreDto extends AbstractDto {
  @NumberField()
  originId!: number;

  @StringField()
  name!: string;

  @NumberFieldOptional({ isArray: true, nullable: true })
  programIds?: Uuid[];

  constructor(genre: GenreEntity) {
    super(genre);
    this.originId = genre.originId;
    this.name = genre.name;
    this.programIds = genre.programs.map((program) => program.id);
  }
}
