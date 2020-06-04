import { IsOptional } from 'class-validator';

import { LoyaltyUser } from 'src/entities/loyalty-user/models/loyalty-user.entity';
import { Plan } from 'src/entities/plan/models/plan.entity';

export class UpdateUserPlanDTO {
  @IsOptional()
  readonly dateCreation?: Date;

  @IsOptional()
  readonly user?: LoyaltyUser | number;

  @IsOptional()
  readonly plan?: Plan | number;
}
