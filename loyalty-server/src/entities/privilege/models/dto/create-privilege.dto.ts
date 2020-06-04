import { IsNotEmpty, IsOptional } from 'class-validator';

import { RolePrivilege } from 'src/entities/role-privilege/models/role-privilege.entity';

export class CreatePrivilegeDTO {
  @IsNotEmpty()
  readonly name: string;

  @IsOptional()
  readonly roles?: (RolePrivilege | number)[];
}
