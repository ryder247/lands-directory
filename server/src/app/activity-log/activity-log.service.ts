import { Injectable, HttpStatus } from '@nestjs/common';
import { ActivityLogRepository } from './activity-log.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryModel } from '../../shared/query.model';
import { ResultException } from '../../core/exceptions/result.exception';

@Injectable()
export class ActivityLogService {
  constructor(
    @InjectRepository(ActivityLogRepository)
    private readonly activityLogRepository: ActivityLogRepository,
  ) {}

  public async getAll(query: QueryModel) {
    try {
      return await this.activityLogRepository.find({
        take: query.pageSize,
        skip: query.pageSize * (query.pageNumber - 1),
        order: { createdAt: -1 },
      });
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getById(id: string) {
    try {
      return await this.activityLogRepository.findOne(id);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
