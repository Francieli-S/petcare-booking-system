import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Sitter } from './Sitter.js';
import { ServiceType } from './types.js';
import { BookingStatus } from './types.js';
import { User } from './User.js';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index()
  @ManyToOne(() => Sitter, { eager: true, onDelete: 'CASCADE' })
  sitter!: Sitter;

  @Index()
  @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' })
  user!: User;

  @Column({ type: 'enum', enum: ServiceType })
  service_type!: ServiceType;

  @Column({ type: 'int', unsigned: true })
  number_of_days!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total_cost!: number;

  @Column({ type: 'enum', enum: BookingStatus, default: BookingStatus.PENDING })
  status!: BookingStatus;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @Column({ type: 'timestamp', nullable: true })
  confirmed_at!: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  canceled_at!: Date | null;

  @DeleteDateColumn()
  deleted_at!: Date | null;
}
