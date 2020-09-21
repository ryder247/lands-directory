import { Module } from '@nestjs/common';
import { LandFileService } from './land-file.service';
import { LandFileController } from './land-file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LandFileRepository } from './land-file.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LandFileRepository])],
  providers: [LandFileService],
  controllers: [LandFileController],
})
export class LandFileModule {}
