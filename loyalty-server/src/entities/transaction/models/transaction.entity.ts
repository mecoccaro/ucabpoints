import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  OneToOne,
  JoinColumn,
  Check,
} from 'typeorm';

import { TransactionType } from './const/transaction-type.enum';
import { Account } from 'src/entities/account/models/account.entity';
import { TransactionStatus } from 'src/entities/transaction-status/models/transaction-status.entity';
import { Amount } from 'src/entities/amount/models/amount.entity';
import { CodeResponse } from './const/code-response.enum';

@Entity()
@Check(
  `"type" = 'VERIFY_ACCOUNT' OR "type" = 'BUY_POINTS' OR "type" = 'CHANGE_POINTS' OR "type" = 'CHANGE_PLAN'`
)
//@Check(`"code_response" = '' OR "code_response" = ''`)
export class Transaction {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id?: number;

  @Column({ nullable: true, name: 'transaction_number', type: 'varchar' })
  transactionNumber?: string;

  @Column({
    nullable: false,
    name: 'type',
    type: 'varchar',
  })
  transactionType: string;

  @Column({ nullable: false, name: 'date_creation', type: 'timestamp' })
  dateCreation: Date;

  @Column({ nullable: false, name: 'last_date_update', type: 'timestamp' })
  lastDateUpdate: Date;

  @Column({ nullable: true, name: 'date_approve', type: 'timestamp' })
  dateApprove?: Date;

  @Column({ nullable: true, type: 'varchar' })
  observation?: string;

  @Column({
    nullable: true,
    name: 'code_response',
    type: 'varchar',
  })
  codeResponse?: string;

  @Column({ nullable: false, name: 'total_amount', type: 'numeric' })
  totalAmount: number;

  @Column({ nullable: true, type: 'integer' })
  points: number;

  @OneToMany(
    () => TransactionStatus,
    (transactionStatus) => transactionStatus.id
  )
  transactionStatus?: (TransactionStatus | number)[];

  @ManyToOne(
    () => Account,
    (account) => account.id
  )
  @JoinColumn({ name: 'account_id' })
  account: Account | number;

  @OneToOne(
    () => Amount,
    (amount) => amount.id
  )
  amount?: Amount | number;

  @Column({ nullable: true, name: 'transaction_stripe', type: 'varchar' })
  transactionStripe?: string;
}
