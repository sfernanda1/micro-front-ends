import { TestBed } from '@angular/core/testing';

import { ParceirosService } from './parceiros.service';

describe('ParceiroService', () => {
  let service: ParceirosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParceirosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
