import { IsOptional } from 'class-validator';

import { Transaction } from 'src/entities/transaction/models/transaction.entity';
import { Status } from 'src/entities/status/models/status.entity';

export class UpdateTransactionStatusDTO {
  @IsOptional()
  readonly dateCreation?: Date;

  @IsOptional()
  readonly transaction?: Transaction | number;

  @IsOptional()
  readonly status?: Status | number;
}
