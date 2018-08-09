import { TestBed, inject } from '@angular/core/testing';

import { GridService } from './grid.service';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
describe('GridService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GridService],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    });
  });

  it('should be created', inject([GridService], (service: GridService) => {
    expect(service).toBeTruthy();
  }));

  it('should set coloumn name',inject([GridService], (service: GridService)=>{
    service.columnName = 'orderId';
    expect(service.columnName).toBe('orderId');
  }));

  it('should set sortfield',inject([GridService],(service : GridService)=>{
    service.sortField = "name";
    expect(service.sortField).toBe('name');
  }));
});
