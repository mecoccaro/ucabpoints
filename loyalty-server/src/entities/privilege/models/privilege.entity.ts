import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { RolePrivilege } from 'src/entities/role-privilege/models/role-privilege.entity';

@Entity()
export class Privilege {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id?: number;

  @Column({ nullable: false, type: 'varchar' })
  name: string;

  @OneToMany(
    () => RolePrivilege,
    (roles) => roles.id
  )
  roles?: (RolePrivilege | number)[];
}
