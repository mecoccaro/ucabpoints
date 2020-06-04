import { IsNotEmpty } from 'class-validator';

import { Benefit } from 'src/entities/benefit/models/benefit.entity';
import { Plan } from 'src/entities/plan/models/plan.entity';

export class CreateBenefitPlanDTO {
  @IsNotEmpty()
  readonly benefit: Benefit | number;

  @IsNotEmpty()
  readonly plan: Plan | number;
}
