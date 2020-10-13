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
  createdAt: string;
  expires: string;
  rent: string;
  minuteFiles: MinuteModel[];
  officeHistories: OfficeHistoryModel[];
}

export class MinuteModel {
  type: string;
  minuteNumber: string;
  uploadFileUrl: any;
  landFileId: string;
}

export class OfficeHistoryModel {
  giver: string;
  location: string;
  collector: string;
  officeNumber: string;
  landFileId: string;
  delivered: string;
  createdAt: string;
}
