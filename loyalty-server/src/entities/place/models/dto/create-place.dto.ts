import { IsNotEmpty, IsOptional, Matches } from 'class-validator';

import { Person } from 'src/entities/person/models/person.entity';
import { Place } from '../place.entity';

export class CreatePlaceDTO {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @Matches(RegExp('COUNTRY|STATE|CITY|STREET'))
  readonly placeType: string;

  @IsOptional()
  readonly place?: Place | number;

  @IsOptional()
  readonly places?: (Place | number)[];

  @IsOptional()
  readonly persons?: (Person | number)[];
}
