import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Check,
} from 'typeorm';

import { StatusType } from './const/status-type.enum';
import { AccountStatus } from 'src/entities/account-status/models/account-status.entity';
import { TransactionStatus } from 'src/entities/transaction-status/models/transaction-status.entity';
import { UserStatus } from 'src/entities/user-status/models/user-status.entity';

@Entity()
@Check(`"type" = 'ACCOUNT' OR "type" = 'TRANSACTION' OR "type" = 'USER'`)
export class Status {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id?: number;

  @Column({ nullable: false, type: 'varchar' })
  name: string;

  @Column({ nullable: false, name: 'type', type: 'varchar' })
  statusType: string;

  @Column({ nullable: true, type: 'varchar' })
  description?: string;

  @OneToMany(
    () => AccountStatus,
    (accounts) => accounts.id
  )
  accounts?: (AccountStatus | number)[];

  @OneToMany(
    () => TransactionStatus,
    (transactions) => transactions.id
  )
  transactions?: (TransactionStatus | number)[];

  @OneToMany(
    () => UserStatus,
    (users) => users.id
  )
  users?: (UserStatus | number)[];
}
