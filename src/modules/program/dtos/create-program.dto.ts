import {
  EnumFieldOptional,
  NumberField,
} from '../../../decorators/field.decorators.ts';
import {
  ProgramEnumType,
  TmdbProgramSortType,
} from '../consts/program-type.const.ts';

export class CreateProgramDto {
  @EnumFieldOptional(() => ProgramEnumType)
  readonly programType!: ProgramEnumType;

  @EnumFieldOptional(() => TmdbProgramSortType)
  readonly sortBy!: TmdbProgramSortType;

  @NumberField()
  readonly page!: number;

  @NumberField()
  readonly tmdbWatchProviderId!: number;
}
