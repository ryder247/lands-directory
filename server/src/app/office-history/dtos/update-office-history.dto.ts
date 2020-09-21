import { ApiProperty } from '@nestjs/swagger';

export class UpdateOfficeHistoryDto {
  @ApiProperty()
  officeNumber: string;
  @ApiProperty()
  location: string;
  @ApiProperty()
  delivered: string;
  @ApiProperty()
  deliveredDateTime: string;
}
