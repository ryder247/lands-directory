import { ActivityLogService } from './activity-log.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityLogController } from './activity-log.controller';
import { ActivityLogRepository } from './activity-log.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ActivityLogRepository])],
  controllers: [ActivityLogController],
  providers: [ActivityLogService],
})
export class ActivityLogModule {}
