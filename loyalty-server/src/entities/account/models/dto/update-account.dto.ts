import { IsOptional, Matches } from 'class-validator';

import { LoyaltyUser } from 'src/entities/loyalty-user/models/loyalty-user.entity';
import { AccountStatus } from 'src/entities/account-status/models/account-status.entity';
import { Transaction } from 'src/entities/transaction/models/transaction.entity';

export class UpdateAccountDTO {
  @IsOptional()
  readonly routingNumber?: string;

  @IsOptional()
  readonly accountNumber?: string;

  @IsOptional()
  @Matches(RegExp('INDIVIDUAL|COMPANY'))
  readonly accountType?: string;

  @IsOptional()
  @Matches(RegExp('T|F'))
  readonly primary?: string;

  @IsOptional()
  readonly user?: LoyaltyUser | number;

  @IsOptional()
  readonly status?: (AccountStatus | number)[];

  @IsOptional()
  readonly transaction?: (Transaction | number)[];

  @IsOptional()
  readonly externalAccountStripe?: string;

  @IsOptional()
  readonly customerSourceStripe?: string;
}
