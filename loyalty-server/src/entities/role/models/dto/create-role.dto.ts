import { IsNotEmpty, Matches, IsOptional } from 'class-validator';

import { LoyaltyUser } from 'src/entities/loyalty-user/models/loyalty-user.entity';
import { RolePrivilege } from 'src/entities/role-privilege/models/role-privilege.entity';

export class CreateRoleDTO {
  @IsNotEmpty()
  @Matches(RegExp('ADMINISTRATOR|CLIENT'))
  readonly name: string;

  @IsOptional()
  readonly privileges?: (RolePrivilege | number)[];

  @IsOptional()
  readonly loyaltyUsers?: (LoyaltyUser | number)[];
}
