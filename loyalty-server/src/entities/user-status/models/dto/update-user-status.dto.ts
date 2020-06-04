import { IsOptional } from 'class-validator';

import { Status } from 'src/entities/status/models/status.entity';
import { LoyaltyUser } from 'src/entities/loyalty-user/models/loyalty-user.entity';

export class UpdateUserStatusDTO {
  @IsOptional()
  readonly dateCreation?: Date;

  @IsOptional()
  readonly user?: LoyaltyUser | number;

  @IsOptional()
  readonly status?: Status | number;
}
