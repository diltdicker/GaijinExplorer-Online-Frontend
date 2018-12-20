import { TestBed } from '@angular/core/testing';

import { MangaManagerService } from './manga-manager.service';

describe('MangaManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MangaManagerService = TestBed.get(MangaManagerService);
    expect(service).toBeTruthy();
  });
});
