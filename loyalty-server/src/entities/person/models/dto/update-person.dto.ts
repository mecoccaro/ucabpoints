import { IsOptional } from 'class-validator';

import { LoyaltyUser } from 'src/entities/loyalty-user/models/loyalty-user.entity';
import { Place } from 'src/entities/place/models/place.entity';

export class UpdatePersonDTO {
  @IsOptional()
  readonly personalId?: string;

  @IsOptional()
  readonly firstName?: string;

  @IsOptional()
  readonly secondName?: string;

  @IsOptional()
  readonly firstLastname?: string;

  @IsOptional()
  readonly secondLastname?: string;

  @IsOptional()
  readonly dateOfBirth?: Date;

  @IsOptional()
  readonly user?: LoyaltyUser | number;

  @IsOptional()
  readonly place?: Place | number;
}
