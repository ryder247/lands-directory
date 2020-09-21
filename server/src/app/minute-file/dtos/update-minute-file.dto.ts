import { ApiProperty } from '@nestjs/swagger';

export class UpdateMinuteFileDto {
  @ApiProperty()
  minuteNumber: string;
  @ApiProperty()
  type: string;
  @ApiProperty()
  uploadFileUrl: string;
}
