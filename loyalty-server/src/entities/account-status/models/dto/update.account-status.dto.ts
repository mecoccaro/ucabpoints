import { IsOptional } from 'class-validator';

import { Account } from 'src/entities/account/models/account.entity';
import { Status } from 'src/entities/status/models/status.entity';

export class UpdateAccountStatusDTO {
  @IsOptional()
  readonly dateCreation?: Date;

  @IsOptional()
  readonly account?: Account | number;

  @IsOptional()
  readonly status?: Status | number;
}
