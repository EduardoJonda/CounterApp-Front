import { TestBed, inject } from '@angular/core/testing';

import { MonitoreoService } from './monitoreo.service';

describe('MonitoreoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MonitoreoService]
    });
  });

  it('should be created', inject([MonitoreoService], (service: MonitoreoService) => {
    expect(service).toBeTruthy();
  }));
});
