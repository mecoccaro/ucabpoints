import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';

import { Role } from 'src/entities/role/models/role.entity';
import { Person } from 'src/entities/person/models/person.entity';
import { Account } from 'src/entities/account/models/account.entity';
import { UserPlan } from 'src/entities/user-plan/models/user-plan.entity';
import { UserStatus } from 'src/entities/user-status/models/user-status.entity';

@Entity()
export class LoyaltyUser {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id?: number;

  @Column({ nullable: true, type: 'varchar' }) //imagenes typescript y postgresql  // varchar o bytea
  picture?: any;

  @Column({ nullable: false, unique: true, type: 'varchar' })
  email: string;

  @Column({ nullable: true, type: 'varchar' })
  password?: string;

  @ManyToOne(
    () => Role,
    (role) => role.id,
    { nullable: false }
  )
  @JoinColumn({ name: 'role_id' })
  role: Role | number;

  @OneToOne(
    () => Person,
    (person) => person.id
  )
  person?: Person | number;

  @OneToMany(
    () => Account,
    (accounts) => accounts.id
  )
  accounts?: (Account | number)[];

  @OneToMany(
    () => UserPlan,
    (plans) => plans.id
  )
  plans?: (UserPlan | number)[];

  @OneToMany(
    () => UserStatus,
    (status) => status.id
  )
  status?: (UserStatus | number)[];

  @Column({ nullable: true, name: 'customer_stripe', type: 'varchar' })
  customerStripe?: string;

  @Column({ nullable: true, name: 'account_stripe', type: 'varchar' })
  accountStripe?: string;
}
