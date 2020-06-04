import { IsNotEmpty, IsOptional } from 'class-validator';

import { LoyaltyUser } from 'src/entities/loyalty-user/models/loyalty-user.entity';
import { Place } from 'src/entities/place/models/place.entity';

export class CreatePersonDTO {
  @IsOptional()
  readonly personalId?: string;

  @IsNotEmpty()
  readonly firstName: string;

  @IsOptional()
  readonly secondName?: string;

  @IsNotEmpty()
  readonly firstLastname: string;

  @IsOptional()
  readonly secondLastname?: string;

  @IsOptional()
  readonly dateOfBirth?: Date;

  @IsNotEmpty()
  readonly user: LoyaltyUser | number;

  @IsOptional()
  readonly place?: Place | number;
}
