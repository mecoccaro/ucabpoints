import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { Transaction } from 'src/entities/transaction/models/transaction.entity';

@Entity()
export class Amount {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id?: number;

  @Column({ nullable: false, type: 'integer' })
  points: number;

  @Column({ nullable: false, name: 'added_amount', type: 'numeric' })
  addedAmount: number;

  @Column({ nullable: false, name: 'service_commission', type: 'numeric' })
  serviceCommission: number;

  @Column({ nullable: false, name: 'process_commission', type: 'numeric' })
  processCommission: number;

  @OneToOne(
    () => Transaction,
    (transaction) => transaction.id,
    { nullable: false }
  )
  @JoinColumn({ name: 'transaction_id' })
  transaction: Transaction | number;
}
