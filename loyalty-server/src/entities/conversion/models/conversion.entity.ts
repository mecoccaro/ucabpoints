import { Entity, Column, Check, PrimaryGeneratedColumn } from 'typeorm';
import { UnitA } from './const/unit-a.enum';
import { UnitB } from './const/unit-b.enum';

@Entity()
@Check(`"unit_a" = 'DOLLAR'`)
@Check(`"unit_b" = 'POINT'`)
export class Conversion {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id?: number;

  @Column({
    nullable: false,
    name: 'unit_a',
    type: 'varchar',
  })
  unitA: string;

  @Column({
    nullable: false,
    name: 'unit_b',
    type: 'varchar',
  })
  unitB: string;

  @Column({ nullable: false, name: 'an_a_is_so_many_b', type: 'numeric' })
  anAIsSoManyB: number;

  @Column({
    nullable: true,
    name: 'date_creation',
    type: 'date',
  })
  dateOfCreation?: Date;
}
