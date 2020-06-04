import {
  Entity,
  Column,
  Check,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Benefit } from 'src/entities/benefit/models/benefit.entity';
import { Plan } from 'src/entities/plan/models/plan.entity';

@Entity()
export class BenefitPlan {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id?: number;

  @ManyToOne(
    () => Benefit,
    (benefit) => benefit.id,
    { nullable: false }
  )
  @JoinColumn({ name: 'benefit_id' })
  benefit: Benefit | number;

  @ManyToOne(
    () => Plan,
    (plan) => plan.id,
    { nullable: false }
  )
  @JoinColumn({ name: 'plan_id' })
  plan: Plan | number;
}
