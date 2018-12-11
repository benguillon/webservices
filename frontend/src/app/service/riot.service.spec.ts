import { TestBed, inject } from '@angular/core/testing';

import { RiotService } from './riot.service';

describe('RiotService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RiotService]
    });
  });

  it('should be created', inject([RiotService], (service: RiotService) => {
    expect(service).toBeTruthy();
  }));
});
