import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Check,
  OneToMany,
} from 'typeorm';

import { PlanName } from './const/plan-name.enum';
import { UserPlan } from 'src/entities/user-plan/models/user-plan.entity';
import { BenefitPlan } from 'src/entities/benefit-plan/models/benefit-plan.entity';

@Entity()
@Check(`"name" = 'BASIC' OR "name" = 'PREMIUM' OR "name" = 'GOLD'`)
export class Plan {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id?: number;

  @Column({
    nullable: false,
    type: 'varchar',
  })
  name: string;

  @Column({ nullable: true, type: 'varchar' })
  description?: string;

  @Column({ nullable: true, type: 'numeric' })
  amount?: number;

  @OneToMany(
    () => UserPlan,
    (users) => users.id
  )
  users?: (UserPlan | number)[];

  @OneToMany(
    () => BenefitPlan,
    (benefits) => benefits.id
  )
  benefits?: (BenefitPlan | number)[];
}
