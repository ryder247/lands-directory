import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MinuteFileRepository } from './minute-file.repository';
import { MinuteFileService } from './minute-file.service';
import { MinuteFileController } from './minute-file.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MinuteFileRepository])],
  providers: [MinuteFileService],
  controllers: [MinuteFileController],
})
export class MinuteFileModule {}
