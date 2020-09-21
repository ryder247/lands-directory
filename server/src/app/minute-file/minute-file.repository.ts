import { EntityRepository, Repository } from 'typeorm';
import { MinuteFileEntity } from './minute-file.entity';
@EntityRepository(MinuteFileEntity)
export class MinuteFileRepository extends Repository<MinuteFileEntity> {}
