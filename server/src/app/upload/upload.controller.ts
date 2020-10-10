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
        const dbLandFile = await this.landFileService.getByRefNumber(
          landFile.referenceNumber,
        );
        if (dbLandFile){
          landFile.duplicate = "true";
          await this.landFileService.save(landFile);
        } else {
          await this.landFileService.save(landFile);
        }
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
        referenceNumber: column[1],
        propertyNumber: column[3],
        natureOfInstrument: column[4],
        dateOfInstrument: column[5],
        grantor: column[6],
        grantee: column[7],
        location: column[8],
        acreage: column[9],
        consideration: column[11],
        purpose: column[12],
        fileNumber: column[13],
        termYears: column[14],
        documentationDate: column[16],
        shelfNumber: column[17],
      } as SaveLandFileDto;
    });

    return landFiles;
  }
}
