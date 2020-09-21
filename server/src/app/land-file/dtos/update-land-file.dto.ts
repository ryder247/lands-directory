import { IsEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateLandFileDto {
  @ApiProperty()
  @IsEmpty({ message: 'Property Number must be provided' })
  propertyNumber: string;
  @ApiProperty()
  @IsEmpty({ message: 'Reference Number must be provided' })
  referenceNumber: string;
  @ApiProperty()
  @IsEmpty({ message: 'Reference Number must be provided' })
  natureOfInstrument: string;
  @ApiProperty()
  @IsEmpty({ message: 'Date Of Instrument must be provided' })
  dateOfInstrument: string;
  @ApiProperty()
  @IsEmpty({ message: 'Grantor must be provided' })
  grantor: string;
  @ApiProperty()
  @IsEmpty({ message: 'Grantee must be provided' })
  grantee: string;
  @ApiProperty()
  @IsEmpty({ message: 'Acreage must be provided' })
  acreage: string;
  @ApiProperty()
  consideration: string;
  @ApiProperty()
  @IsEmpty({ message: 'File Number must be provided' })
  fileNumber: string;
  @ApiProperty()
  termYears: string;
  @ApiProperty()
  purpose: string;
  @ApiProperty()
  location: string;
  @ApiProperty()
  shelfNumber: string;
  @ApiProperty()
  documentationDate: string;
}
