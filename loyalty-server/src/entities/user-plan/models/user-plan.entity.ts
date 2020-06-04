import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { LoyaltyUser } from 'src/entities/loyalty-user/models/loyalty-user.entity';
import { Plan } from 'src/entities/plan/models/plan.entity';

@Entity()
export class UserPlan {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id?: number;

  @Column({ nullable: false, name: 'date_creation', type: 'timestamp' })
  dateCreation: Date;

  @ManyToOne(
    () => LoyaltyUser,
    (user) => user.id,
    { nullable: false }
  )
  @JoinColumn({ name: 'user_id' })
  user: LoyaltyUser | number;

  @ManyToOne(
    () => Plan,
    (plan) => plan.id,
    { nullable: false }
  )
  @JoinColumn({ name: 'plan_id' })
  plan: Plan | number;
}
