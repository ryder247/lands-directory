import { Injectable, HttpStatus } from '@nestjs/common';
import { LandFileRepository } from './land-file.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ResultException } from '../../core/exceptions/result.exception';
import { QueryModel } from '../../shared/query.model';
import { SaveLandFileDto } from './dtos/save-land-file.dto';
import { UpdateLandFileDto } from './dtos/update-land-file.dto';
import { Contains } from 'class-validator';

@Injectable()
export class LandFileService {
  constructor(
    @InjectRepository(LandFileRepository)
    private readonly landFileRepository: LandFileRepository,
  ) {}

  public async getAll(queryModel: QueryModel) {
    console.log('query', queryModel);
    try {
      const landfiles = await this.landFileRepository.find({
        relations: ['minuteFiles', 'officeHistories'],
        order: { createdAt: -1 },
      });

      const filteredLandfiles = this.filterBySearch(landfiles, queryModel);

      const query = new QueryModel(queryModel);
      const skip = +query.pageSize * +query.pageNumber;
      const take = +query.pageSize + skip;
      const paginatedLandfiles = filteredLandfiles.slice(skip, take);

      return {
        data: paginatedLandfiles,
        pagination: {
          totalPages: +Math.ceil(filteredLandfiles.length / query.pageSize),
          totalItems: +filteredLandfiles.length,
          pageNumber: +query.pageNumber,
          pageSize: +query.pageSize,
        },
      };
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

  public async getByRefNumber(referenceNumber: string) {
    try {
      return await this.landFileRepository.findOne({ where: { referenceNumber } });
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async save(landFileDto: SaveLandFileDto) {
    try {
      const dbLandFile = await this.getByRefNumber(landFileDto.referenceNumber);
      if (dbLandFile) {
        landFileDto.duplicate = "true";
        await this.landFileRepository.save(landFileDto);
      } else {
        await this.landFileRepository.save(landFileDto);
      }
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async update(id: string, landFileDto: UpdateLandFileDto) {
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

  private filterBySearch(items: any[], queryModel: any): any[] {
    if (!items) return [];

    const filteredItems = items.filter(it => {
      const item = { ...it };
      delete item.id;
      delete item.createdAt;
      delete item.updatedAt;
      const includes = JSON.stringify(item)
        .toLocaleLowerCase()
        .includes(queryModel.searchTerm.toLocaleLowerCase());

      if (includes) return it;
    });

    const filteredItemsAdvance = this.performAdvanceSearch(
      filteredItems,
      queryModel,
    );
    return filteredItemsAdvance;
  }
  performAdvanceSearch(filteredItems: any[], queryModel: any) {
    if (queryModel.termYears && queryModel.termYears !== 'undefined') {
      filteredItems = filteredItems.filter(
        it => it.termYears.toLowerCase() === queryModel.termYears.toLowerCase(),
      );
    }

    if (
      queryModel.natureOfInstrument &&
      queryModel.natureOfInstrument !== 'undefined'
    ) {
      filteredItems = filteredItems.filter(
        it =>
          it.natureOfInstrument.toLowerCase() ===
          queryModel.natureOfInstrument.toLowerCase(),
      );
    }

    if (queryModel.purpose && queryModel.purpose !== 'undefined') {
      filteredItems = filteredItems.filter(
        it => it.purpose.toLowerCase() === queryModel.purpose.toLowerCase(),
      );
    }

    return filteredItems;
  }
}
