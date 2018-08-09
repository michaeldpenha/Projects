import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchfieldComponent } from './searchfield.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SearchfieldComponent', () => {
  let component: SearchfieldComponent;
  let fixture: ComponentFixture<SearchfieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchfieldComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchfieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should trigger search event' , () => {
    let e = {target : {value : 1}};
    component.searchTrigger.subscribe((a) => {
      expect(a).toBe(1);
    });
    component.searchData(e);
  });
});
