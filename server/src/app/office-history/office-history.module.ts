import { Module } from '@nestjs/common';
import { OfficeHistoryRepository } from './office-history.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfficeHistoryService } from './office-history.service';
import { OfficeHistoryController } from './office-history.controller';

@Module({
  imports: [TypeOrmModule.forFeature([OfficeHistoryRepository])],
  providers: [OfficeHistoryService],
  controllers: [OfficeHistoryController],
})
export class OfficeHistoryModule {}
