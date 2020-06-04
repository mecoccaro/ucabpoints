import { Entity, Column, PrimaryGeneratedColumn, Check } from 'typeorm';

@Entity()
//@Check(`"type" = 'PERCENT' OR "type" = 'DOLLAR'`)
export class Commission {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id?: number;

  @Column({ nullable: false, name: 'service_charge', type: 'numeric' })
  serviceCharge: number;

  @Column({ nullable: false, name: 'service_transfer', type: 'numeric' })
  serviceTransfer: number;

  @Column({ nullable: false, type: 'numeric' })
  processor: number;

  @Column({ nullable: false, name: 'date_creation', type: 'timestamp' })
  dateOfCreation: Date;

  // @Column({ nullable: false, name: 'type', type: 'varchar' })
  // commissionType: string;
}
