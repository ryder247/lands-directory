import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../shared/base.entity';
import { LandFileEntity } from '../land-file/land-file.entity';

@Entity({ name: 'OfficeHistoryTable' })
export class OfficeHistoryEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 500, nullable: true })
  officeNumber: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  location: string;

  @Column({ type: 'varchar', length: 500 })
  delivered: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  deliveredDateTime: string;

  @ManyToOne(
    () => LandFileEntity,
    landFile => landFile.officeHistories,
    { cascade: false },
  )
  landFile: LandFileEntity;
}
