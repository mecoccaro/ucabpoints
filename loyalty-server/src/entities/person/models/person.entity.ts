import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { LoyaltyUser } from 'src/entities/loyalty-user/models/loyalty-user.entity';
import { Place } from 'src/entities/place/models/place.entity';

@Entity()
export class Person {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id?: number;

  @Column({
    nullable: true,
    unique: true,
    name: 'personal_id',
    type: 'varchar',
  })
  personalId?: string;

  @Column({ nullable: false, name: 'first_name', type: 'varchar' })
  firstName: string;

  @Column({ nullable: true, name: 'second_name', type: 'varchar' })
  secondName?: string;

  @Column({ nullable: false, name: 'first_lastname', type: 'varchar' })
  firstLastname: string;

  @Column({ nullable: true, name: 'second_lastname', type: 'varchar' })
  secondLastname?: string;

  @Column({
    nullable: true,
    name: 'date_of_birth',
    type: 'date',
  })
  dateOfBirth?: Date;

  @OneToOne(
    () => LoyaltyUser,
    (user) => user.id,
    { nullable: false }
  )
  @JoinColumn({ name: 'user_id' })
  user: LoyaltyUser | number;

  @ManyToOne(
    () => Place,
    (place) => place.id,
    { nullable: true }
  )
  @JoinColumn({ name: 'place_id' })
  place?: Place | number;
}
