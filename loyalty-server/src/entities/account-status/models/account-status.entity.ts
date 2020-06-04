import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Account } from '../../account/models/account.entity';
import { Status } from 'src/entities/status/models/status.entity';

@Entity()
export class AccountStatus {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id?: number;

  @Column({ nullable: false, name: 'date_creation', type: 'timestamp' })
  dateCreation: Date;

  @ManyToOne(
    () => Account,
    (account) => account.id,
    { nullable: false }
  )
  @JoinColumn({ name: 'account_id' })
  account: Account | number;

  @ManyToOne(
    () => Status,
    (status) => status.id,
    { nullable: false }
  )
  @JoinColumn({ name: 'status_id' })
  status: Status | number;
}
