import { LandFileEntity } from './land-file.entity';
import { EntityRepository, Repository } from 'typeorm';
@EntityRepository(LandFileEntity)
export class LandFileRepository extends Repository<LandFileEntity> {}
