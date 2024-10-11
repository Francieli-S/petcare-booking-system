import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { User } from './User.js';
import { ServiceType } from './types.js';

@Entity()
export class Sitter {
  @PrimaryGeneratedColumn()
  sitter_id!: number;

  @OneToOne(() => User)
  user!: User;

  @Column()
  bio!: string;

  @Column()
  services_offered!: ServiceType;

  @Column()
  is_available!: boolean;

  @Column()
  rating!: number;

  @Column()
  rate_per_hour!: number;

  @Column({ default: () => 'NOW()' })
  created_at!: Date;
}
