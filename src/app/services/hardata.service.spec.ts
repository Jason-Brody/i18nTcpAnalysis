import { TestBed, inject } from '@angular/core/testing';

import { HardataService } from './hardata.service';

describe('HardataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HardataService]
    });
  });

  it('should be created', inject([HardataService], (service: HardataService) => {
    expect(service).toBeTruthy();
  }));
});
