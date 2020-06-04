import { IsNotEmpty, Matches, IsOptional } from 'class-validator';

import { UserPlan } from 'src/entities/user-plan/models/user-plan.entity';
import { BenefitPlan } from 'src/entities/benefit-plan/models/benefit-plan.entity';

export class CreatePlanDTO {
  @IsNotEmpty()
  @Matches(RegExp('BASIC|PREMIUM|GOLD'))
  readonly name: string;

  @IsOptional()
  readonly description?: string;

  @IsOptional()
  readonly amount?: number;

  @IsOptional()
  readonly users?: (UserPlan | number)[];

  @IsOptional()
  readonly benefits?: (BenefitPlan | number)[];
}
