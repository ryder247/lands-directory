import { Column } from 'typeorm/decorator/columns/Column';
import { BaseEntity } from '../../shared/base.entity';
import { Entity, OneToMany } from 'typeorm';
import { MinuteFileEntity } from '../minute-file/minute-file.entity';
import { OfficeHistoryEntity } from '../office-history/office-history.entity';

@Entity({ name: 'LandFileTable' })
export class LandFileEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 500, nullable: true })
  propertyNumber: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  referenceNumber: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  natureOfInstrument: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  dateOfInstrument: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  grantor: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  grantee: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  location: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  acreage: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  consideration: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  purpose: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  fileNumber: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  termYears: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  shelfNumber: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  documentationDate: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  duplicate: string;

  @OneToMany(
    () => MinuteFileEntity,
    minute => minute.landFile,
    { cascade: true, eager: true, onDelete: 'CASCADE' },
  )
  minuteFiles: MinuteFileEntity[];

  @OneToMany(
    () => OfficeHistoryEntity,
    minute => minute.landFile,
    { cascade: true, eager: true, onDelete: 'CASCADE' },
  )
  officeHistories: OfficeHistoryEntity[];
}
