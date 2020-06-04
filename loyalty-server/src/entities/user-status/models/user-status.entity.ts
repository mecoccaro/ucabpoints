import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Status } from 'src/entities/status/models/status.entity';
import { LoyaltyUser } from 'src/entities/loyalty-user/models/loyalty-user.entity';

@Entity()
export class UserStatus {
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
    () => Status,
    (status) => status.id,
    { nullable: false }
  )
  @JoinColumn({ name: 'status_id' })
  status: Status | number;
}
