import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Check,
} from 'typeorm';

import { BenefitType } from './const/benefit-type.enum';
import { BenefitPlan } from 'src/entities/benefit-plan/models/benefit-plan.entity';

@Entity()
@Check(`"type" = 'PERCENT' OR "type" = 'POINT'`)
export class Benefit {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id?: number;

  @Column({ nullable: false, type: 'numeric' })
  value: number;

  @Column({ nullable: false, name: 'type', type: 'varchar' })
  benefitType: string;

  @OneToMany(
    () => BenefitPlan,
    (plans) => plans.benefit
  )
  plans?: (BenefitPlan | number)[];
}
