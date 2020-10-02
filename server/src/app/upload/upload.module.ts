import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LandFileRepository } from '../land-file/land-file.repository';
import { LandFileService } from '../land-file/land-file.service';
import { UploadController } from './upload.controller';

@Module({
  imports: [
    MulterModule.register({
      dest: './files',
    }),
    TypeOrmModule.forFeature([LandFileRepository]),
  ],
  controllers: [UploadController],
  providers: [LandFileService],

  exports: [MulterModule],
})
export class UploadModule {}
