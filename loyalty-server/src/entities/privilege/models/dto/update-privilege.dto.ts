import { IsOptional } from 'class-validator';

import { RolePrivilege } from 'src/entities/role-privilege/models/role-privilege.entity';

export class UpdatePrivilegeDTO {
  @IsOptional()
  readonly name?: string;

  @IsOptional()
  readonly roles?: (RolePrivilege | number)[];
}
