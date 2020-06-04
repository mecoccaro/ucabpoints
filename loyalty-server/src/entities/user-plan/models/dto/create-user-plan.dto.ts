import { IsNotEmpty } from 'class-validator';

import { LoyaltyUser } from 'src/entities/loyalty-user/models/loyalty-user.entity';
import { Plan } from 'src/entities/plan/models/plan.entity';

export class CreateUserPlanDTO {
  @IsNotEmpty()
  readonly dateCreation: Date;

  @IsNotEmpty()
  readonly user: LoyaltyUser | number;

  @IsNotEmpty()
  readonly plan: Plan | number;
}
