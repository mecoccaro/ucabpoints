import { IsOptional } from 'class-validator';

import { Benefit } from 'src/entities/benefit/models/benefit.entity';
import { Plan } from 'src/entities/plan/models/plan.entity';

export class UpdateBenefitPlanDTO {
  @IsOptional()
  readonly benefit?: Benefit | number;

  @IsOptional()
  readonly plan?: Plan | number;
}
