import { IsOptional } from 'class-validator';

import { Privilege } from 'src/entities/privilege/models/privilege.entity';
import { Role } from 'src/entities/role/models/role.entity';

export class UpdateRolePrivilegeDTO {
  @IsOptional()
  readonly privilege?: Privilege | number;

  @IsOptional()
  readonly role?: Role | number;
}
