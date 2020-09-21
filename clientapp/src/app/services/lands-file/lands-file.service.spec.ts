import { TestBed } from '@angular/core/testing';

import { LandsFileService } from './lands-file.service';

describe('LandsFileService', () => {
  let service: LandsFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LandsFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
