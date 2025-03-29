import { StringFieldOptional } from '../../../decorators/field.decorators.ts';
import type { ProgramEnumType } from '../consts/program-type.const.ts';

export class CreateProgramDto {
  @StringFieldOptional()
  readonly programType!: ProgramEnumType;
}
