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
  HttpStatus,
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
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: fileFileFilter,
    }),
  )
  async uploadFile(@UploadedFile() file, @Res() res) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
      filepath: `api/v1/upload/${file.filename}`,
    };

    if (file.filename.split('.')[1].includes('xls')) {
      const landFiles = await this.uploadExcelEntries(file);

      landFiles.forEach(async (landFile: SaveLandFileDto) => {
        const dbLandFile = await this.landFileService.getByFileNumber(
          landFile.fileNumber,
        );
        if (!dbLandFile) await this.landFileService.save(landFile);
      });
    }

    console.log('response', response);
    return res.status(HttpStatus.OK).json({
      message: 'File Uploaded',
      data: response,
    });
  }

  @Post('multiple')
  @UseInterceptors(
    FilesInterceptor('file', 20, {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: fileFileFilter,
    }),
  )
  async uploadMultipleFiles(@UploadedFiles() files, @Res() res) {
    const response = [];
    files.forEach(file => {
      const fileResponse = {
        originalname: file.originalname,
        filename: file.filename,
      };
      response.push(fileResponse);
    });
    return res.status(HttpStatus.OK).json({
      message: 'File Uploaded',
      data: response,
    });
  }

  private async uploadExcelEntries(file: any) {
    let landFiles = [];

    const filePath = `./files/${file.filename}`;
    const rows = await excelFile(filePath);
    landFiles = rows.slice(1).map((column: any[]) => {
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
