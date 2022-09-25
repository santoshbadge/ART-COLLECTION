import { TestBed } from '@angular/core/testing';

import { ArtServiceService } from './art-service.service';

describe('ArtServiceService', () => {
  let service: ArtServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
