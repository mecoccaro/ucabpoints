import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Privilege } from 'src/entities/privilege/models/privilege.entity';
import { Role } from 'src/entities/role/models/role.entity';

@Entity()
export class RolePrivilege {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id?: number;

  @ManyToOne(
    () => Privilege,
    (privilege) => privilege.id,
    { nullable: false }
  )
  @JoinColumn({ name: 'privilege_id' })
  privilege: Privilege | number;

  @ManyToOne(
    () => Role,
    (role) => role.id,
    { nullable: false }
  )
  @JoinColumn({ name: 'role_id' })
  role: Role | number;
}
