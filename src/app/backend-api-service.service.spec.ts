import { TestBed } from '@angular/core/testing';

import { BackendApiServiceService } from './backend-api-service.service';

describe('BackendApiServiceService', () => {
  let service: BackendApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
