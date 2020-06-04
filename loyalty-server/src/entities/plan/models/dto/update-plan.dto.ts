import { IsOptional, Matches } from 'class-validator';

import { UserPlan } from 'src/entities/user-plan/models/user-plan.entity';
import { BenefitPlan } from 'src/entities/benefit-plan/models/benefit-plan.entity';

export class UpdatePlanDTO {
  @IsOptional()
  @Matches(RegExp('BASIC|PREMIUM|GOLD'))
  readonly name?: string;

  @IsOptional()
  readonly description?: string;

  @IsOptional()
  readonly amount?: number;

  @IsOptional()
  readonly users?: (UserPlan | number)[];

  @IsOptional()
  readonly benefits?: (BenefitPlan | number)[];
}
