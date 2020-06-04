import { IsNotEmpty, IsOptional, Matches } from 'class-validator';

import { AccountStatus } from 'src/entities/account-status/models/account-status.entity';
import { TransactionStatus } from 'src/entities/transaction-status/models/transaction-status.entity';
import { UserStatus } from 'src/entities/user-status/models/user-status.entity';

export class CreateStatusDTO {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @Matches(RegExp('ACCOUNT|TRANSACTION|USER'))
  readonly statusType: string;

  @IsOptional()
  readonly description?: string;

  @IsOptional()
  readonly accounts?: (AccountStatus | number)[];

  @IsOptional()
  readonly transactions?: (TransactionStatus | number)[];

  @IsOptional()
  readonly users?: (UserStatus | number)[];
}
