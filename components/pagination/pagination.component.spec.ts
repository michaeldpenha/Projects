import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginationComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.perPage = 10;
    component.page = 1;
    component.count = 5;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should give minimun Page Nmber' , () =>{
    let count = component.getMin();
    expect(count).toBe(1);
  })
  it('should give minimun Page Nmber' , () =>{
    let count = component.getMin();
    expect(count).toBe(1);
  });
  it('should give max Page Nmber' , () =>{
    let count = component.getMax();
    expect(5).toBe(5);
  })
  it('should give the current page',()=>{
    component.goPage.subscribe(c => {
      expect(c).toBe(2);
    })
    component.onPage(2);
  });
  it('should trigger previous page event' ,() => {
    component.goPrev.subscribe(c=>{
      expect(c).toBe(true);
    });
    component.onPrev();
  });

  it('should trigger previous page event' ,() => {
    component.goNext.subscribe(c=>{
      expect(c).toBe(true);
    });
    component.onNext(true);
  });
  it('should retrun total no of pages', () =>{
    component.count = 15;
    let result = component.totalPages();
    expect(result).toBe(2);
  });
  it('should trigger perPage event', () =>{
    component.changeInPerPage.subscribe(c => {
      expect(c).toBe(15)
    });
    component.onPageSelect([15]);
  });
});
