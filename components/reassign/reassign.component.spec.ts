import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReassignComponent } from './reassign.component';
import { Component } from '@angular/core';
import { HttpClient, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { ReassignService } from './reassign.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UtilsService } from '../../services/utils/utils.service';
import { RouterTestingModule } from '@angular/router/testing';
import { LoaderService } from '../../services/index';
describe('ReassignComponent', () => {
  let component: ReassignComponent;
  let fixture: ComponentFixture<ReassignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, RouterTestingModule],
      declarations: [ReassignComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [HttpClient, HttpHandler, ReassignService, UtilsService, LoaderService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReassignComponent);
    component = fixture.componentInstance;
    component.selectedArray = [{
      orderId: '15',
      deliveryDate: "2018-05-10",
      status: "Queued",
      volume: '30'
    }, {
      orderId: '10',
      deliveryDate: "2018-05-05",
      status: "Queued",
      volume: '100'
    }]
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("reassign should be true", () => {
    //expect(component.onSubmitReassign(component.reassignForm)).toBeTruthy();
  });
  it('should return api endpoint for Sales Order', () => {
    component.parentCmp = 'salesorder';
    let result = component.fetchPatchUrl();
    expect(result.url).toBe('http://xipl0626-vm:8090/api/issuers/1/reassign-sales-orders');
  });
  it('should return api endpoint for Production Order', () => {
    component.parentCmp = 'productionorder';
    let result = component.fetchPatchUrl();
    expect(result.url).toBe('http://xipl0626-vm:8090/api/issuers/1/reassign-production-orders');
  });
  it('should return the selected Medium', () => {
    component.recordFromRadioSelection({ 'medium': 'satellites' });
    expect(component.clientMachineSelected.length).toBe(1);
  });
  it('Redirect medium is required for Sales Order', () => {
    component.parentCmp = "salesorder";
    let result = component.isRedirectionMediumRequired();
    expect(result).toBeFalsy();
  });
  it('should show hide Icon', () => {
    component.showHide = false;
    component.showHideIcon();
    expect(component.showHide).toBeTruthy();
  });
  it('should trigger Cancel event', () => {
    component.onCancelClick.subscribe(() => {
      expect(component).toBeTruthy();
    });
    component.onCancel();
  });
  it('should remove selected array', () => {
    component.selectedArray = [{ 'orderId': 2 }];
    component.removeSelectedArray({}, { 'orderId': 2 });
    expect(component.selectedArray.length).toBe(0);
  });
  it('should populate selected array', () => {
    component.selectedArray = [{ 'orderId': 2 }];
    let result = component.toPopulateSelectedArray();
    expect(result.length).toBe(1);
  });
  it('should return params that need to be pass for redirect for satellite', () => {
    component.redirectionMedium = "SATELLITE";
    component.reassignForm.controls['externalSatellite'].setValue(1);
    component.selectedArray = [{ 'orderId': 2 }];
    let urlResult = component.fetchPatchUrl();
    let result = component.manipulateParam(urlResult.url);
    expect(result['redirectOption']).toBe('SATELLITE');
    expect(result['satelliteId']).toBe(1);
    expect(result[urlResult.keyParam][0]).toBe(2);
  });
   it('should return params that need to be pass for redirect for Client Machines', () => {
    component.redirectionMedium = "CLIENT_MACHINE";
    component.recordFromRadioSelection({'id':1});
    component.selectedArray = [{ 'orderId': 2 }];
    let urlResult = component.fetchPatchUrl()
    let result = component.manipulateParam(urlResult.url);
    expect(result['redirectOption']).toBe('CLIENT_MACHINE');
    expect(result['satelliteId']).toBe('1');
    expect(result['clientMachineId']).toBe(1);
  });
  it('should check redirectmedium', () => {
    component.reassignForm.controls.so.setValue("SATELLITES");
    component.checkType();
    expect(component.redirectionMedium).toBe("SATELLITES");
 })
});