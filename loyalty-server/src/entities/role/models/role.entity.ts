import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Check,
} from 'typeorm';

import { RoleName } from './const/role-name.enum';
import { LoyaltyUser } from 'src/entities/loyalty-user/models/loyalty-user.entity';
import { RolePrivilege } from 'src/entities/role-privilege/models/role-privilege.entity';

@Entity()
@Check(`"name" = 'CLIENT' OR "name" = 'ADMINISTRATOR'`)
export class Role {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id?: number;

  @Column({
    nullable: false,
    type: 'varchar',
  })
  name: string;

  @OneToMany(
    () => RolePrivilege,
    (privileges) => privileges.id
  )
  privileges?: (RolePrivilege | number)[];

  @OneToMany(
    () => LoyaltyUser,
    (loyaltyUsers) => loyaltyUsers.id
  )
  loyaltyUsers?: (LoyaltyUser | number)[];
}
