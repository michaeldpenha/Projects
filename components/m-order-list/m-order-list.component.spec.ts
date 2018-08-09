import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MOrderListComponent } from './m-order-list.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {CardsComponent} from '../index';

describe('MOrderListComponent', () => {
  let component: MOrderListComponent;
  let fixture: ComponentFixture<MOrderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MOrderListComponent,CardsComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MOrderListComponent);
    component = fixture.componentInstance;
    component.config = [];
    component.data = [];
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
