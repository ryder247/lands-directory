import { Controller, Get, Res, Query, HttpStatus, Param } from '@nestjs/common';
import { ActivityLogService } from './activity-log.service';
import { Response } from 'express';
import { QueryModel } from '../../shared/query.model';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Activity Logs')
@Controller('api/v1/activity_logs')
export class ActivityLogController {
  constructor(private readonly activityLogService: ActivityLogService) {}
  @Get()
  public async getAll(
    @Res() res: Response,
    @Query() query: QueryModel,
  ): Promise<any> {
    const landFiles = await this.activityLogService.getAll(query);
    return res.status(HttpStatus.OK).json({
      message: 'Activity Logs retrieved successfully',
      data: landFiles,
    });
  }

  @Get('/:id')
  public async getById(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<any> {
    const landFile = await this.activityLogService.getById(id);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Activity Log retrieved successfully', data: landFile });
  }
}
