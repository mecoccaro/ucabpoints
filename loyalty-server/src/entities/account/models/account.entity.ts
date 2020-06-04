import {
  Entity,
  Column,
  Check,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Unique,
} from 'typeorm';

import { AccountType } from './const/account-type.enum';
import { LoyaltyUser } from 'src/entities/loyalty-user/models/loyalty-user.entity';
import { AccountStatus } from 'src/entities/account-status/models/account-status.entity';
import { Transaction } from 'src/entities/transaction/models/transaction.entity';

@Entity()
@Check(`"type" = 'INDIVIDUAL' OR "type" = 'COMPANY'`)
@Check(`"primary_account" = 'T' OR "primary_account" = 'F'`)
@Unique('unique_ranumber', ['routingNumber', 'accountNumber'])
export class Account {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id?: number;

  @Column({ nullable: false, name: 'routing_number', type: 'varchar' })
  routingNumber: string;

  @Column({ nullable: false, name: 'account_number', type: 'varchar' })
  accountNumber: string;

  @Column({ nullable: false, name: 'type', type: 'varchar' })
  accountType: string;

  @Column({ nullable: false, name: 'primary_account', type: 'varchar' })
  primary: string;

  @ManyToOne(
    () => LoyaltyUser,
    (user) => user.id,
    { nullable: false }
  )
  @JoinColumn({ name: 'user_id' })
  user: LoyaltyUser | number;

  @OneToMany(
    () => AccountStatus,
    (status) => status.id
  )
  status?: (AccountStatus | number)[];

  @OneToMany(
    () => Transaction,
    (transaction) => transaction.id
  )
  transaction?: (Transaction | number)[];

  @Column({ nullable: true, name: 'external_account_stripe', type: 'varchar' })
  externalAccountStripe?: string;

  @Column({ nullable: true, name: 'customer_source_stripe', type: 'varchar' })
  customerSourceStripe?: string;
}
