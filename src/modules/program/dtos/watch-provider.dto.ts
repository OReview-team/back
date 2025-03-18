import { AbstractDto } from '../../../common/dto/abstract.dto.ts';
import {
  NumberField,
  NumberFieldOptional,
  StringField,
} from '../../../decorators/field.decorators.ts';
import type { WatchProviderEntity } from '../entities/watch-provider.entity.ts';

export class WatchProviderDto extends AbstractDto {
  @NumberField()
  originId!: number;

  @StringField()
  name!: string;

  @NumberFieldOptional({ isArray: true, nullable: true })
  programIds?: Uuid[];

  constructor(watchProvider: WatchProviderEntity) {
    super(watchProvider);
    this.originId = watchProvider.originId;
    this.name = watchProvider.name;
    this.programIds = watchProvider.programs.map((program) => program.id);
  }
}
