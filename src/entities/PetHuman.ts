import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { User } from './User.js';
import { PetType } from './types.js';

@Entity()
export class PetHuman {
  @PrimaryGeneratedColumn()
  pet_human_id!: number;

  @OneToOne(() => User)
  user!: User;

  @Column()
  number_of_pets!: number;

  @Column({ type: 'enum', enum: PetType })
  pets_type!: PetType;

  @Column()
  medical_notes!: string;

  @Column({ default: () => 'NOW()' })
  created_at!: Date;
}
