export class LandFileModel {
  propertyNumber: string;
  referenceNumber: string;
  natureOfInstrument: string;
  dateOfInstrument: string;
  grantor: string;
  grantee: string;
  acreage: string;
  consideration: string;
  fileNumber: string;
  termYears: string;
  purpose: string;
  location: string;
  shelfNumber: string;
  documentationDate: string;
  minuteFiles: MinuteModel[];
  officeHistories: OfficeHistory[];
}

export class MinuteModel {
  type: string;
  minuteNumber: string;
  uploadFileUrl: string;
}

export class OfficeHistory {
  giver: string;
  location: string;
  collector: string;
  delivered: string;
  officeNumber: string;
  deliveredDateTime: string;
}
