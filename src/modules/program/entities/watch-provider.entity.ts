import { Column, Entity, ManyToMany } from 'typeorm';

import { AbstractEntity } from '../../../common/abstract.entity.ts';
import { UseDto } from '../../../decorators/use-dto.decorator.ts';
import { WatchProviderDto } from '../dtos/watch-provider.dto.ts';
import { ProgramEntity } from './program.entity.ts';

@Entity({ name: 'watch_providers' })
@UseDto(WatchProviderDto)
export class WatchProviderEntity extends AbstractEntity<WatchProviderDto> {
  @Column({ type: 'int', comment: 'TMDB에서 제공하는 provider_id' })
  originId!: number;

  @Column({ type: 'varchar' })
  name!: string;

  @ManyToMany(() => ProgramEntity, (program) => program.watchProviders)
  programs!: ProgramEntity[];
}
