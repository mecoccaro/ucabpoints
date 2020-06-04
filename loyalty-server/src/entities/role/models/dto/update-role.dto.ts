import { IsOptional, Matches } from 'class-validator';

import { LoyaltyUser } from 'src/entities/loyalty-user/models/loyalty-user.entity';
import { RolePrivilege } from 'src/entities/role-privilege/models/role-privilege.entity';

export class UpdateRoleDTO {
  @IsOptional()
  @Matches(RegExp('ADMINISTRATOR|CLIENT'))
  readonly name?: string;

  @IsOptional()
  readonly privileges?: (RolePrivilege | number)[];

  @IsOptional()
  readonly loyaltyUsers?: (LoyaltyUser | number)[];
}
