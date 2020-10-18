import {
  Controller,
  Get,
  Res,
  Query,
  HttpStatus,
  Param,
  Delete,
  Put,
  Body,
  Post,
} from '@nestjs/common';
import { Response } from 'express';

import { QueryModel } from '../../shared/query.model';
import { OfficeHistoryService } from './office-history.service';
import { SaveOfficeHistoryDto } from './dtos/save-office-history.dto';
import { UpdateOfficeHistoryDto } from './dtos/update-office-history.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Office Histories')
@Controller('api/v1/office_histories')
export class OfficeHistoryController {
  constructor(private readonly officeHistoryService: OfficeHistoryService) {}

  @Get()
  public async getAll(
    @Res() res: Response,
    @Query() query: QueryModel,
  ): Promise<any> {
    const officeHistories = await this.officeHistoryService.getAll(query);
    return res.status(HttpStatus.OK).json({
      message: 'Office Histories retrieved successfully',
      data: officeHistories,
    });
  }

  @Get('/:id')
  public async getById(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<any> {
    const officeHistory = await this.officeHistoryService.getById(id);
    return res.status(HttpStatus.OK).json({
      message: 'Office History retrieved successfully',
      data: officeHistory,
    });
  }

  @Post()
  public async save(
    @Res() res: Response,
    @Body() saveOfficeHistoryDto: SaveOfficeHistoryDto,
  ): Promise<any> {
    const officeHistory = await this.officeHistoryService.save(
      saveOfficeHistoryDto,
    );
    return res.status(HttpStatus.OK).json({
      message: 'Office History saved successfully',
      data: officeHistory,
    });
  }

  @Put('/:id')
  public async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateOfficeHistoryDto: UpdateOfficeHistoryDto,
  ): Promise<any> {
    const officeHistory = await this.officeHistoryService.update(
      id,
      updateOfficeHistoryDto,
    );
    return res.status(HttpStatus.OK).json({
      message: 'Office History updated successfully',
      data: officeHistory,
    });
  }


  @Put('/deliver/:id')
  public async deliver(
    @Res() res: Response,
    @Param('id') id: string,
   
  ): Promise<any> {
    const officeHistory = await this.officeHistoryService.deliver(id);
    return res.status(HttpStatus.OK).json({
      message: 'Office History deliverered successfully',
      data: officeHistory,
    });
  }

  @Delete('/:id')
  public async delete(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<any> {
    const officeHistory = await this.officeHistoryService.delete(id);
    return res.status(HttpStatus.OK).json({
      message: 'Office History deleted successfully',
      data: officeHistory,
    });
  }
}
