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
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index()
  @ManyToOne(() => Sitter, { eager: true, onDelete: 'CASCADE' })
  sitter!: Sitter;

  @Index()
  @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' })
  user!: User;

  @Column({ type: 'enum', enum: ServiceType })
  serviceType!: ServiceType;

  @Column({ type: 'int', unsigned: true })
  numberOfDays!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalCost!: number;

  @Column({ type: 'enum', enum: BookingStatus, default: BookingStatus.PENDING })
  status!: BookingStatus;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ type: 'timestamp', nullable: true })
  confirmedAt!: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  canceledAt!: Date | null;

  @DeleteDateColumn()
  deletedAt!: Date | null;
}
