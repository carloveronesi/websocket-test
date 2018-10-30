import { TestBed, inject } from '@angular/core/testing';

import { ConnectServiceService } from './connect-service.service';

describe('ConnectServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConnectServiceService]
    });
  });

  it('should be created', inject([ConnectServiceService], (service: ConnectServiceService) => {
    expect(service).toBeTruthy();
  }));
});
