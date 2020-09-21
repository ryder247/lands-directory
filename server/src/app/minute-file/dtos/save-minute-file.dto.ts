import { ApiProperty } from '@nestjs/swagger';

export class SaveMinuteFileDto {
  @ApiProperty()
  minuteNumber: string;
  @ApiProperty()
  type: string;
  @ApiProperty()
  uploadFileUrl: string;
}
