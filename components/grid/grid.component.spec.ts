import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { GridComponent } from './grid.component';
import { CUSTOM_ELEMENTS_SCHEMA ,EventEmitter} from '@angular/core';
import { GridService } from './grid.service';
import { GridConfig } from '../../models/grid.config';
import {UtilsService}  from '../../services/utils/utils.service';
describe('GridComponent', () => {
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GridComponent],
      providers: [GridService,UtilsService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.reverseSort = false;
    component.gridData = [{
      fName: 'Michael',
      lName: 'Dpenha'
    }, {
      fName: 'Mayur',
      lName: 'Patil'
    }, {
      fName: 'Sheetal',
      lName: 'Aware'
    }, {
      fName: 'Sachin',
      lName: 'Rajput'
    }];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a custom template', () => {
    let result = component.customTemplate(component.gridData[0], new GridConfig('fName', 'First Name', true,false));
    expect(result).toBe('Michael');
  });
  it('should show Sort Options', inject([GridService], (service: GridService) => {
    service.sortField = 'fName';
    let result = component.showSortingOptions(new GridConfig('fName', 'First Name', true,false));
    expect(result).toBe(true);
  }));
  it('should hide Sort Options', inject([GridService], (service: GridService) => {
    service.sortField = 'fName';
    let result = component.showSortingOptions(new GridConfig('fName', 'First Name', false,false));
    expect(result).toBe(false);
  }));
  it('should trigger sort', inject([GridService,UtilsService], (service: GridService,utils: UtilsService) => {
    service.sortField = 'fName';
    component.sortTrigger.subscribe(a=>{
      expect(a.property).toBe('fName');
    });
     component.triggerSort(new GridConfig('fName', 'First Name', true,parent));
  }));
  it('should not trigger sort', inject([GridService,UtilsService], (service: GridService,utils: UtilsService) => {
     component.triggerSort(new GridConfig('fName', 'First Name', false,parent));
  }));
  // it('should trigger previous page', inject([GridService,UtilsService], (service: GridService,utils: UtilsService) => {
  //   component.previousPage.subscribe(a=>{
  //     expect(component).toBeTruthy();
  //   });
  //   component.prevPage();
  // }));
  // it('should trigger next page', inject([GridService,UtilsService], (service: GridService,utils: UtilsService) => {
  //   component.nextPage.subscribe(a=>{
  //     expect(component).toBeTruthy();
  //   });
  //   component.goNext();
  // }));
  // it('should move  to a particular page', inject([GridService,UtilsService], (service: GridService,utils: UtilsService) => {
  //   component.goToPage.subscribe(a=>{
  //     expect(a.page).toBe(1);
  //   });
  //   component.moveToPage({page: 1});
  // }));
  // it('should Change per page limit', inject([GridService,UtilsService], (service: GridService,utils: UtilsService) => {
  //   component.pageLimitChange.subscribe(a=>{
  //     expect(a.limit).toBe(20);
  //   });
  //   component.changeLimit({limit: 20});
  // }));
  it('should give me all the records', inject([GridService,UtilsService], (service: GridService,utils: UtilsService) => {
    component.allChecked.subscribe(a=>{
      expect(a.fName).toBe('michael');
    });
    component.allSelected({fName: 'michael'});
  }));
  it('should give me selected record', inject([GridService,UtilsService], (service: GridService,utils: UtilsService) => {
    component.rowSelected.subscribe(a=>{
      expect(a.fName).toBe('michael');
    });
    component.rowSelection ({fName: 'michael'});
  }));
  it('disable checkbox',() => {
    component.checkBoxDisable = (item : any) => {
      return item.status.toLowerCase() != "queued";
    }
    let result = component.disableCheckBox({'status' : 'queued'});
    expect(result).toBe(false);
  });
  it('tirgger Cell click' , ()=>{
    component.onCellClick.subscribe((a)=>{
      expect(a.dataIndex).toBe('orderId');
    });
    component.cellClick('orderId','id');
  });
});
