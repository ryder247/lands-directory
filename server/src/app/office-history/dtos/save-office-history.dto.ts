import { ApiProperty } from '@nestjs/swagger';

export class SaveOfficeHistoryDto {
  @ApiProperty()
  giver: string;
  @ApiProperty()
  collector: string;
  @ApiProperty()
  officeNumber: string;
  @ApiProperty()
  location: string;
}
