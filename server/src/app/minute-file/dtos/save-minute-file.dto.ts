import { ApiProperty } from '@nestjs/swagger';

export class SaveMinuteFileDto {
  @ApiProperty()
  landFileId: string;
  @ApiProperty()
  minuteNumber: string;
  @ApiProperty()
  type: string;
  @ApiProperty()
  uploadFileUrl: string;
}
