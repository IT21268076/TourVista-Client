import { TestBed } from '@angular/core/testing';

import { IntendedRouteService } from './intended-route.service';

describe('IntendedRouteService', () => {
  let service: IntendedRouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntendedRouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
