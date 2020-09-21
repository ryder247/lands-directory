import { ApiProperty } from '@nestjs/swagger';

export class SaveOfficeHistoryDto {
  @ApiProperty()
  uploadFileUrl: string;
  @ApiProperty()
  officeNumber: string;
  @ApiProperty()
  location: string;
  @ApiProperty()
  delivered: string;
  @ApiProperty()
  deliveredDateTime: string;
}
