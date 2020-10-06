import { TestBed } from '@angular/core/testing';

import { OfficeHistoryService } from './office-history.service';

describe('OfficeHistoryService', () => {
  let service: OfficeHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfficeHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
