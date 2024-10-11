import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserRole } from './types';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id!: number;

  @Column({ defaut: () => 'gen_random_uuid()' })
  uuid!: string;

  @Column()
  first_name!: string;

  @Column()
  last_name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column()
  phone!: number;

  @Column({ type: 'enum', enum: UserRole })
  role!: UserRole;

  @Column()
  city!: string;

  @Column({ default: () => 'NOW()' })
  created_at!: Date;
}
