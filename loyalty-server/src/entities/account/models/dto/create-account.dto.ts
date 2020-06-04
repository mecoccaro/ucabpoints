import { IsNotEmpty, Matches, IsOptional } from 'class-validator';

import { LoyaltyUser } from 'src/entities/loyalty-user/models/loyalty-user.entity';
import { AccountStatus } from 'src/entities/account-status/models/account-status.entity';
import { Transaction } from 'src/entities/transaction/models/transaction.entity';

export class CreateAccountDTO {
  @IsNotEmpty()
  readonly routingNumber: string;

  @IsNotEmpty()
  readonly accountNumber: string;

  @IsNotEmpty()
  @Matches(RegExp('INDIVIDUAL|COMPANY'))
  readonly accountType: string;

  @IsNotEmpty()
  @Matches(RegExp('T|F'))
  readonly primary: string;

  @IsNotEmpty()
  readonly user: LoyaltyUser | number;

  @IsOptional()
  readonly status?: (AccountStatus | number)[];

  @IsOptional()
  readonly transaction?: (Transaction | number)[];

  @IsOptional()
  readonly externalAccountStripe?: string;

  @IsOptional()
  readonly customerSourceStripe?: string;
}
