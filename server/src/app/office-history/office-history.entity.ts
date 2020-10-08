import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../shared/base.entity';
import { LandFileEntity } from '../land-file/land-file.entity';

@Entity({ name: 'OfficeHistoryTable' })
export class OfficeHistoryEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 500, nullable: true })
  officeNumber: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  location: string;

  @Column({ type: 'varchar', length: 500, nullable: true, default: 'No' })
  delivered: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  giver: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  collector: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  deliveredDateTime: string;

  @ManyToOne(
    () => LandFileEntity,
    landFile => landFile.officeHistories,
    { cascade: false },
  )
  @JoinColumn({ name: 'landFileId' })
  landFile: LandFileEntity;

  @Column({ nullable: true })
  landFileId: string;
}
