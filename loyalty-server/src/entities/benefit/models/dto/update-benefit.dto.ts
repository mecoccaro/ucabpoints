import { Matches, IsOptional } from 'class-validator';

import { BenefitPlan } from 'src/entities/benefit-plan/models/benefit-plan.entity';

export class UpdateBenefitDTO {
  @IsOptional()
  readonly value?: number;

  @IsOptional()
  @Matches(RegExp('PERCENT|POINT'))
  readonly benefitType?: string;

  @IsOptional()
  readonly plans?: (BenefitPlan | number)[];
}
