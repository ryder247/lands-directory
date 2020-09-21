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

import { LandFileService } from './land-file.service';
import { QueryModel } from '../../shared/query.model';
import { UpdateLandFileDto } from './dtos/update-land-file.dto';
import { SaveLandFileDto } from './dtos/save-land-file.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Land Files')
@Controller('api/v1/land_files')
export class LandFileController {
  constructor(private readonly landFileService: LandFileService) {}

  @Get()
  public async getAll(
    @Res() res: Response,
    @Query() query: QueryModel,
  ): Promise<any> {
    const landFiles = await this.landFileService.getAll(query);
    return res.status(HttpStatus.OK).json({
      message: 'Land files retrieved successfully',
      data: landFiles,
    });
  }

  @Get('/:id')
  public async getById(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<any> {
    const landFile = await this.landFileService.getById(id);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Land file retrieved successfully', data: landFile });
  }

  @Post()
  public async save(
    @Res() res: Response,
    @Body() saveLandFileDto: SaveLandFileDto,
  ): Promise<any> {
    const landFile = await this.landFileService.save(saveLandFileDto);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Land file saved successfully', data: landFile });
  }

  @Put('/:id')
  public async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateLandFileDto: UpdateLandFileDto,
  ): Promise<any> {
    const landFile = await this.landFileService.update(id, updateLandFileDto);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Land file updated successfully', data: landFile });
  }

  @Delete('/:id')
  public async delete(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<any> {
    const landFile = await this.landFileService.delete(id);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Land file deleted successfully', data: landFile });
  }
}
