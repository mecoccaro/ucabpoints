import { IsOptional, Matches } from 'class-validator';

import { Person } from 'src/entities/person/models/person.entity';
import { Place } from '../place.entity';

export class UpdatePlaceDTO {
  @IsOptional()
  readonly name?: string;

  @IsOptional()
  @Matches(RegExp('COUNTRY|STATE|CITY|STREET'))
  readonly placeType?: string;

  @IsOptional()
  readonly place?: Place | number;

  @IsOptional()
  readonly places?: (Place | number)[];

  @IsOptional()
  readonly persons?: (Person | number)[];
}
