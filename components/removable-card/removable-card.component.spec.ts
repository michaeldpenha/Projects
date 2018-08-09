import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovableCardComponent } from './removable-card.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('RemovableCardComponent', () => {
  let component: RemovableCardComponent;
  let fixture: ComponentFixture<RemovableCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemovableCardComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] 
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemovableCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
