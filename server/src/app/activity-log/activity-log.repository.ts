import { EntityRepository, Repository } from 'typeorm';
import { ActivityLogEntity } from './activity-log.entity';
@EntityRepository(ActivityLogEntity)
export class ActivityLogRepository extends Repository<ActivityLogEntity> {}
