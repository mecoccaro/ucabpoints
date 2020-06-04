import { IsOptional, Matches } from 'class-validator';

export class UpdateCommissionDTO {
  @IsOptional()
  readonly serviceCharge?: number;

  @IsOptional()
  readonly serviceTransfer?: number;

  @IsOptional()
  readonly processor?: number;

  @IsOptional()
  readonly dateOfCreation?: Date;

  // @IsOptional()
  // @Matches(RegExp('PERCENT|DOLLAR'))
  // readonly commissionType?: string;
}
