import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalComponent } from './modal.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [BsModalRef]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should close the Modal on cancel',() =>{
    component.onCancel();
  })
  it('should close the modal popup on click of ok',() =>{
    component.onClickOk();
  });
  it('should redirect onAnchor Click',()=>{
    component.anchorClick.subscribe(()=>{
        expect(component).toBeTruthy();
    });
    component.onAnchorClick();

  })
});
