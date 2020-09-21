import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../shared/base.entity';

@Entity({ name: 'ActivityLogTable' })
export class ActivityLogEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 500, nullable: true })
  message: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  type: string;
}
