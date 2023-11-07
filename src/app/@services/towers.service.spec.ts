import { TestBed } from '@angular/core/testing';

import { TowersService } from './towers.service';

describe('TowersService', () => {
  let service: TowersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TowersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
