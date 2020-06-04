import { IsInt, IsOptional } from 'class-validator';

import { Transaction } from 'src/entities/transaction/models/transaction.entity';

export class UpdateAmountDTO {
  @IsOptional()
  @IsInt()
  readonly points?: number;

  @IsOptional()
  readonly addedAmount?: number;

  @IsOptional()
  readonly serviceCommission?: number;

  @IsOptional()
  readonly processCommission?: number;

  @IsOptional()
  readonly transaction?: Transaction | number;
}
