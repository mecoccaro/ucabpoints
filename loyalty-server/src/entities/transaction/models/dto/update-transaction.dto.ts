import { IsOptional, Matches } from 'class-validator';

import { Account } from 'src/entities/account/models/account.entity';
import { TransactionStatus } from 'src/entities/transaction-status/models/transaction-status.entity';
import { Amount } from 'src/entities/amount/models/amount.entity';

export class UpdateTransactionDTO {
  @IsOptional()
  readonly transactionNumber?: string;

  @IsOptional()
  @Matches(RegExp('VERIFY_ACCOUNT|BUY_POINTS|CHANGE_POINTS|CHANGE_PLAN'))
  readonly transactionType?: string;

  @IsOptional()
  readonly dateCreation?: Date;

  @IsOptional()
  readonly lastDateUpdate?: Date;

  @IsOptional()
  readonly dateApprove?: Date;

  @IsOptional()
  readonly observation?: string;

  @IsOptional()
  readonly codeResponse?: string;

  @IsOptional()
  readonly totalAmount?: number;

  @IsOptional()
  readonly points?: number;

  @IsOptional()
  readonly transactionStatus?: (TransactionStatus | number)[];

  @IsOptional()
  readonly account?: Account | number;

  @IsOptional()
  readonly amount?: Amount | number;

  @IsOptional()
  readonly transactionStripe?: string;
}
