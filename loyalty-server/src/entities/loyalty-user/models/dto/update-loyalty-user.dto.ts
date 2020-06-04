import { IsOptional } from 'class-validator';

import { Role } from 'src/entities/role/models/role.entity';
import { UserPlan } from 'src/entities/user-plan/models/user-plan.entity';
import { Account } from 'src/entities/account/models/account.entity';
import { Person } from 'src/entities/person/models/person.entity';
import { UserStatus } from 'src/entities/user-status/models/user-status.entity';

export class UpdateLoyaltyUserDTO {
  @IsOptional()
  readonly picture?: any;

  @IsOptional()
  readonly email?: string;

  @IsOptional()
  readonly password?: string;

  @IsOptional()
  readonly role?: Role | number;

  @IsOptional()
  readonly person?: Person | number;

  @IsOptional()
  readonly accounts?: (Account | number)[];

  @IsOptional()
  readonly plans?: (UserPlan | number)[];

  @IsOptional()
  readonly status?: (UserStatus | number)[];

  @IsOptional()
  readonly customerStripe?: string;

  @IsOptional()
  readonly accountStripe?: string;
}
