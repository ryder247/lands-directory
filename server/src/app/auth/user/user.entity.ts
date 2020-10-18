import { Entity, Column, BeforeInsert } from 'typeorm';
import { BaseEntity } from '../../../shared/base.entity';
@Entity({ name: 'LUserTable' })
export class User extends BaseEntity {
  @Column()
  fullName: string;

  @Column({ default: '' })
  avatar: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: 'user', nullable: true })
  role: string;

  @Column({ default: true })
  approved: boolean;
}
