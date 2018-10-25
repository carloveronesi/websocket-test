import { TestBed, inject } from '@angular/core/testing';

import { DialogoService } from './dialogo.service';

describe('DialogoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DialogoService]
    });
  });

  it('should be created', inject([DialogoService], (service: DialogoService) => {
    expect(service).toBeTruthy();
  }));
});
