import { IsNotEmpty, IsInt } from 'class-validator';

import { Transaction } from 'src/entities/transaction/models/transaction.entity';

export class CreateAmountDTO {
  @IsNotEmpty()
  @IsInt()
  readonly points: number;

  @IsNotEmpty()
  readonly addedAmount: number;

  @IsNotEmpty()
  readonly serviceCommission: number;

  @IsNotEmpty()
  readonly processCommission: number;

  @IsNotEmpty()
  readonly transaction: Transaction | number;
}
