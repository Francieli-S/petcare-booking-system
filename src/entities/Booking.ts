import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Sitter } from './Sitter.js';
import { PetHuman } from './PetHuman.js';
import { ServiceType } from './types.js';
import { BookingStatus } from './types.js';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  booking_id!: number;

  @ManyToOne(() => Sitter)
  sitter!: Sitter;

  @ManyToOne(() => PetHuman)
  pet_human!: PetHuman;
  
  @Column()
  service_type!: ServiceType;

  @Column()
  booking_month!: string;

  @Column()
  booking_days!: string;

  @Column()
  total_hours!: number;

  @Column()
  total_price!: number;

  @Column()
  status!: BookingStatus;

  @Column()
  review!: string;

  @Column({ default: () => 'NOW()' })
  created_at!: Date;
}
