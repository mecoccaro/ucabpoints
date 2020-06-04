import { IsNotEmpty } from 'class-validator';

import { Privilege } from 'src/entities/privilege/models/privilege.entity';
import { Role } from 'src/entities/role/models/role.entity';

export class CreateRolePrivilegeDTO {
  @IsNotEmpty()
  readonly privilege: Privilege | number;

  @IsNotEmpty()
  readonly role: Role | number;
}
