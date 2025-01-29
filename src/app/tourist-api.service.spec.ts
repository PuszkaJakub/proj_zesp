import { TestBed } from '@angular/core/testing';

import { TouristApiService } from './tourist-api.service';

describe('TouristApiService', () => {
  let service: TouristApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TouristApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
