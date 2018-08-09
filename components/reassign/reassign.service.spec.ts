import { TestBed, inject } from '@angular/core/testing';

import { HttpClient, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { ReassignService } from './reassign.service';

describe('ReassignService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler, ReassignService]
    });
  });

  it('should be created', inject([ReassignService], (service: ReassignService) => {
    expect(service).toBeTruthy();
  }));
});
