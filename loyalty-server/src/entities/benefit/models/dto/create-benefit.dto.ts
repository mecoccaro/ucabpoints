import { IsNotEmpty, Matches, IsOptional } from 'class-validator';

import { BenefitPlan } from 'src/entities/benefit-plan/models/benefit-plan.entity';

export class CreateBenefitDTO {
  @IsNotEmpty()
  readonly value: number;

  @IsNotEmpty()
  @Matches(RegExp('PERCENT|POINT'))
  readonly benefitType: string;

  @IsOptional()
  readonly plans?: (BenefitPlan | number)[];
}
