import { TestBed } from '@angular/core/testing';

import { IconMapService } from './icon-map.service';

describe('IconMapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IconMapService = TestBed.get(IconMapService);
    expect(service).toBeTruthy();
  });
});
