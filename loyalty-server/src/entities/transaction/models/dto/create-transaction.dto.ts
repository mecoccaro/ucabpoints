import { IsNotEmpty, Matches, IsOptional } from 'class-validator';

import { Account } from 'src/entities/account/models/account.entity';
import { TransactionStatus } from 'src/entities/transaction-status/models/transaction-status.entity';
import { Amount } from 'src/entities/amount/models/amount.entity';

export class CreateTransactionDTO {
  @IsOptional()
  readonly transactionNumber?: string;

  @IsNotEmpty()
  @Matches(RegExp('VERIFY_ACCOUNT|BUY_POINTS|CHANGE_POINTS|CHANGE_PLAN'))
  readonly transactionType: string;

  @IsNotEmpty()
  readonly dateCreation: Date;

  @IsNotEmpty()
  readonly lastDateUpdate: Date;

  @IsOptional()
  readonly dateApprove?: Date;

  @IsOptional()
  readonly observation?: string;

  @IsOptional()
  readonly codeResponse?: string;

  @IsNotEmpty()
  readonly totalAmount: number;

  @IsOptional()
  readonly points?: number;

  @IsOptional()
  readonly transactionStatus?: (TransactionStatus | number)[];

  @IsNotEmpty()
  readonly account: Account | number;

  @IsOptional()
  readonly amount?: Amount | number;

  @IsOptional()
  readonly transactionStripe?: string;
}
