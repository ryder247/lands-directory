import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResultException } from '../../core/exceptions/result.exception';
import { QueryModel } from '../../shared/query.model';
import { Contains } from 'class-validator';
import { OfficeHistoryRepository } from './office-history.repository';
import { SaveOfficeHistoryDto } from './dtos/save-office-history.dto';
import { UpdateOfficeHistoryDto } from './dtos/update-office-history.dto';

@Injectable()
export class OfficeHistoryService {
  constructor(
    @InjectRepository(OfficeHistoryRepository)
    private readonly officeHistoryRepository: OfficeHistoryRepository,
  ) {}

  public async getAll(query: QueryModel) {
    try {
      return await this.officeHistoryRepository.find({
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
      return await this.officeHistoryRepository.findOne(id);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async save(officeHistoryDto: SaveOfficeHistoryDto) {
    try {
      return await this.officeHistoryRepository.save(officeHistoryDto);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }
//deliver
  public async update(id: string, officeHistoryDto: UpdateOfficeHistoryDto) {
    try {
      return await this.officeHistoryRepository.update(id, officeHistoryDto);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async deliver(id: string) {
    try {
      var officeHistoryDto = await this.officeHistoryRepository.findOne(id);
      officeHistoryDto.delivered = "Yes";
      return await this.officeHistoryRepository.update(id, officeHistoryDto);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async delete(id: string) {
    try {
      return await this.officeHistoryRepository.delete(id);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
