import { IsNotEmpty, Matches } from 'class-validator';

export class CreateConversionDTO {
  @IsNotEmpty()
  @Matches(RegExp('DOLLAR'))
  readonly unitA: string;

  @IsNotEmpty()
  @Matches(RegExp('POINT'))
  readonly unitB: string;

  @IsNotEmpty()
  readonly anAIsSoManyB: number;

  @IsNotEmpty()
  readonly dateOfCreation: Date;
}
