import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressStatusComponent } from './progress-status.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ProgressStatusComponent', () => {
  let component: ProgressStatusComponent;
  let fixture: ComponentFixture<ProgressStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressStatusComponent ], 
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
