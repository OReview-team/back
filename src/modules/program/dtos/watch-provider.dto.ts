import { AbstractDto } from '../../../common/dto/abstract.dto.ts';
import {
  NumberField,
  NumberFieldOptional,
  StringField,
} from '../../../decorators/field.decorators.ts';
import type { WatchProviderEntity } from '../entities/watch-provider.entity.ts';

export class WatchProviderDto extends AbstractDto {
  @NumberField()
  tmdbProviderId!: number;

  @StringField()
  name!: string;

  @StringField()
  logoPath!: string;

  @NumberFieldOptional({ isArray: true, nullable: true })
  programIds?: Uuid[];

  constructor(watchProvider: WatchProviderEntity) {
    super(watchProvider);
    this.tmdbProviderId = watchProvider.tmdbProviderId;
    this.name = watchProvider.name;
    this.logoPath = watchProvider.logoPath;
    this.programIds = watchProvider.programs.map((program) => program.id);
  }
}
