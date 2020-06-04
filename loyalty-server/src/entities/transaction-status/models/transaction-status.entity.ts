import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Transaction } from 'src/entities/transaction/models/transaction.entity';
import { Status } from 'src/entities/status/models/status.entity';

@Entity()
export class TransactionStatus {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id?: number;

  @Column({ nullable: false, name: 'date_creation', type: 'timestamp' })
  dateCreation: Date;

  @ManyToOne(
    () => Transaction,
    (transaction) => transaction.id,
    { nullable: false }
  )
  @JoinColumn({ name: 'transaction_id' })
  transaction: Transaction | number;

  @ManyToOne(
    () => Status,
    (status) => status.id,
    { nullable: false }
  )
  @JoinColumn({ name: 'status_id' })
  status: Status | number;
}
