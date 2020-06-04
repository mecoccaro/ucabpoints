import { IsNotEmpty, Matches } from 'class-validator';

export class CreateCommissionDTO {
  @IsNotEmpty()
  readonly serviceCharge: number;

  @IsNotEmpty()
  readonly serviceTransfer: number;

  @IsNotEmpty()
  readonly processor: number;

  @IsNotEmpty()
  readonly dateOfCreation: Date;

  // @IsNotEmpty()
  // @Matches(RegExp('PERCENT|DOLLAR'))
  // readonly commissionType: string;
}
