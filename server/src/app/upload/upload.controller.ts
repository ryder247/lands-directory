import { Column } from 'typeorm/decorator/columns/Column';
import {
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Get,
  Param,
  Res,
  Controller,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { editFileName, fileFileFilter } from './upload.helper';
import { diskStorage } from 'multer';
import { ApiTags } from '@nestjs/swagger';
import * as excelFile from 'read-excel-file/node';
import { SaveLandFileDto } from '../land-file/dtos/save-land-file.dto';
import { LandFileService } from '../land-file/land-file.service';

@ApiTags('Uploads')
@Controller('api/v1/upload')
export class UploadController {
  constructor(private readonly landFileService: LandFileService) {}
  @Get(':filePath')
  seeUploadedFile(@Param('filePath') file, @Res() res) {
    return res.sendFile(file, { root: './files' });
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: fileFileFilter,
    }),
  )
  async uploadFile(@UploadedFile() file) {
    console.log('uploadFile', file);
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };

    const landFiles = await this.uploadExcelEntries(file);
    landFiles.forEach(async (landFile: SaveLandFileDto) => {
      const dbLandFile = await this.landFileService.getByFileNumber(
        landFile.fileNumber,
      );
      if (!dbLandFile) await this.landFileService.save(landFile);
    });
    return response;
  }

  @Post('multiple')
  @UseInterceptors(
    FilesInterceptor('image', 20, {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: fileFileFilter,
    }),
  )
  async uploadMultipleFiles(@UploadedFiles() files) {
    const response = [];
    files.forEach(file => {
      const fileResponse = {
        originalname: file.originalname,
        filename: file.filename,
      };
      response.push(fileResponse);
    });
    return response;
  }

  private async uploadExcelEntries(file: any) {
    if (file.filename.split('.')[1].includes('xls')) {
      const filePath = `./files/${file.filename}`;
      const rows = await excelFile(filePath);
      const landFiles = rows.slice(1).map((column: any[]) => {
        return {
          referenceNumber: column[0],
          propertyNumber: column[1],
          natureOfInstrument: column[2],
          dateOfInstrument: column[3],
          grantor: column[4],
          grantee: column[5],
          location: column[6],
          acreage: column[7],
          consideration: column[8],
          purpose: column[9],
          fileNumber: column[10],
          termYears: column[11],
          documentationDate: column[12],
          shelfNumber: column[13],
        } as SaveLandFileDto;
      });

      return landFiles;
    }
  }
}
