import { IsNotEmpty } from 'class-validator';

import { Status } from 'src/entities/status/models/status.entity';
import { LoyaltyUser } from 'src/entities/loyalty-user/models/loyalty-user.entity';

export class CreateUserStatusDTO {
  @IsNotEmpty()
  readonly dateCreation: Date;

  @IsNotEmpty()
  readonly user: LoyaltyUser | number;

  @IsNotEmpty()
  readonly status: Status | number;
}
