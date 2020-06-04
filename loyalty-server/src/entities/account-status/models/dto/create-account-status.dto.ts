import { IsNotEmpty } from 'class-validator';

import { Account } from 'src/entities/account/models/account.entity';
import { Status } from 'src/entities/status/models/status.entity';

export class CreateAccountStatusDTO {
  @IsNotEmpty()
  readonly dateCreation: Date;

  @IsNotEmpty()
  readonly account: Account | number;

  @IsNotEmpty()
  readonly status: Status | number;
}
