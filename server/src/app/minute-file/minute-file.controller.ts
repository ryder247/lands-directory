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
import { MinuteFileService } from './minute-file.service';
import { SaveMinuteFileDto } from './dtos/save-minute-file.dto';
import { UpdateMinuteFileDto } from './dtos/update-minute-file.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Minute Files')
@Controller('api/v1/minute_files')
export class MinuteFileController {
  constructor(private readonly minuteFileService: MinuteFileService) {}

  @Get()
  public async getAll(
    @Res() res: Response,
    @Query() query: QueryModel,
  ): Promise<any> {
    const minuteFiles = await this.minuteFileService.getAll(query);
    return res.status(HttpStatus.OK).json({
      message: 'Minute files retrieved successfully',
      data: minuteFiles,
    });
  }

  @Get('/:id')
  public async getById(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<any> {
    const minuteFile = await this.minuteFileService.getById(id);
    return res.status(HttpStatus.OK).json({
      message: 'Minute file retrieved successfully',
      data: minuteFile,
    });
  }

  @Post()
  public async save(
    @Res() res: Response,
    @Body() saveMinuteFileDto: SaveMinuteFileDto,
  ): Promise<any> {
    const minuteFile = await this.minuteFileService.save(saveMinuteFileDto);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Minute file saved successfully', data: minuteFile });
  }

  @Put('/:id')
  public async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateMinuteFileDto: UpdateMinuteFileDto,
  ): Promise<any> {
    const minuteFile = await this.minuteFileService.update(
      id,
      updateMinuteFileDto,
    );
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Minute file updated successfully', data: minuteFile });
  }

  @Delete('/:id')
  public async delete(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<any> {
    const minuteFile = await this.minuteFileService.delete(id);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Minute file deleted successfully', data: minuteFile });
  }
}
