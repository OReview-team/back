import { AbstractDto } from '../../../common/dto/abstract.dto.ts';
import {
  NumberField,
  StringField,
  UUIDFieldOptional,
} from '../../../decorators/field.decorators.ts';
import type { GenreEntity } from '../entities/genre.entity.ts';

export class GenreDto extends AbstractDto {
  @NumberField()
  originId!: number;

  @StringField()
  name!: string;

  @UUIDFieldOptional({ nullable: true })
  programIds?: Uuid[];

  constructor(genre: GenreEntity) {
    super(genre);
    this.originId = genre.originId;
    this.name = genre.name;
    this.programIds = genre.programs.map((program) => program.id);
  }
}
