import { IsNotEmpty } from 'class-validator';

import { Transaction } from 'src/entities/transaction/models/transaction.entity';
import { Status } from 'src/entities/status/models/status.entity';

export class CreateTransactionStatusDTO {
  @IsNotEmpty()
  readonly dateCreation: Date;

  @IsNotEmpty()
  readonly transaction: Transaction | number;

  @IsNotEmpty()
  readonly status: Status | number;
}
