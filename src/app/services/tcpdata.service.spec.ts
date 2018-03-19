import { TestBed, inject } from '@angular/core/testing';

import { TcpdataService } from './tcpdata.service';

describe('TcpdataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TcpdataService]
    });
  });

  it('should be created', inject([TcpdataService], (service: TcpdataService) => {
    expect(service).toBeTruthy();
  }));
});
