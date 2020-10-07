import { join } from 'path';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../shared/base.entity';
import { LandFileEntity } from '../land-file/land-file.entity';

@Entity({ name: 'MinuteFileTable' })
export class MinuteFileEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 500, nullable: true })
  minuteNumber: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  type: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  uploadFileUrl: string;

  @ManyToOne(
    () => LandFileEntity,
    landFile => landFile.minuteFiles,
    { cascade: false },
  )
  @JoinColumn({ name: 'landFileId' })
  landFile: LandFileEntity;

  @Column({ nullable: true })
  landFileId: string;
}
