import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  Check,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { PlaceType } from './const/place-type.enum';
import { Person } from 'src/entities/person/models/person.entity';

@Entity()
@Check(
  `"type" = 'COUNTRY' OR "type" = 'STATE' OR "type" = 'CITY' OR "type" = 'STREET'`
)
export class Place {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id?: number;

  @Column({ nullable: false, type: 'varchar' })
  name: string;

  @Column({
    nullable: false,
    name: 'type',
    type: 'varchar',
  })
  placeType: string;

  @ManyToOne(
    () => Place,
    (places) => places.id,
    { nullable: true }
  )
  @JoinColumn({ name: 'place_id' })
  place?: Place | number;

  @OneToMany(
    () => Place,
    (places) => places.id
  )
  places?: (Place | number)[];

  @OneToMany(
    () => Person,
    (persons) => persons.id
  )
  persons?: (Person | number)[];
}
