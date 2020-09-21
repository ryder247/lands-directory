import { EntityRepository, Repository } from 'typeorm';
import { OfficeHistoryEntity } from './office-history.entity';
@EntityRepository(OfficeHistoryEntity)
export class OfficeHistoryRepository extends Repository<OfficeHistoryEntity> {}
