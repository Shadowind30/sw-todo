import { TestBed } from '@angular/core/testing';

import { DataCentralService } from './data-central.service';

describe('DataCentralService', () => {
  let service: DataCentralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataCentralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
