import { IsOptional, Matches } from 'class-validator';

export class UpdateConversionDTO {
  @IsOptional()
  @Matches(RegExp('DOLLAR'))
  readonly unitA?: string;

  @IsOptional()
  @Matches(RegExp('POINT'))
  readonly unitB?: string;

  @IsOptional()
  readonly anAIsSoManyB?: number;

  @IsOptional()
  readonly dateOfCreation?: Date;
}
