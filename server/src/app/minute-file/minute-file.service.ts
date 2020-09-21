import { Contains } from 'class-validator';
import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MinuteFileRepository } from './minute-file.repository';
import { QueryModel } from '../../shared/query.model';
import { ResultException } from '../../core/exceptions/result.exception';
import { SaveMinuteFileDto } from './dtos/save-minute-file.dto';
import { UpdateMinuteFileDto } from './dtos/update-minute-file.dto';

@Injectable()
export class MinuteFileService {
  constructor(
    @InjectRepository(MinuteFileRepository)
    private readonly landFileRepository: MinuteFileRepository,
  ) {}

  public async getAll(query: QueryModel) {
    try {
      return await this.landFileRepository.find({
        take: query.pageSize,
        skip: query.pageSize * (query.pageNumber - 1),
        order: { createdAt: -1 },
        where: Contains(query.searchTerm),
      });
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getById(id: string) {
    try {
      return await this.landFileRepository.findOne(id);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async save(landFileDto: SaveMinuteFileDto) {
    try {
      return await this.landFileRepository.save(landFileDto);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async update(id: string, landFileDto: UpdateMinuteFileDto) {
    try {
      return await this.landFileRepository.update(id, landFileDto);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async delete(id: string) {
    try {
      return await this.landFileRepository.delete(id);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
