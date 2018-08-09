import { Component, OnInit, ViewChild, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GridConfig } from '../../models/index';
import { UtilsService, OrderListService, LoaderService } from '../../services/index';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { BsDatepickerConfig } from "ngx-bootstrap";
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  @Input() refreshData: any;
  @Input() defaultFilter: any;
  @Input() responseKey: string;
  @Input() defaultFilterValue: string;
  @Output() redirectEvent = new EventEmitter<any>();
  @Output() generateOrdersEvent = new EventEmitter<any>();
  public columnDefs: any = [];
  public data: any = [];
  public listData: any = [];
  public defaultPage: number = 1;
  public pageLimit: number = 10;
  public totalRecords: number;
  public pageLimitArray: any = [];
  public placeholder: string = "";
  public filterButtonClass: string = "filter-button fa fa-filter";
  public displayFilterOption: boolean = false;
  filterForm: FormGroup;
  public adavancedArray: any = [];
  public globalSearchText: any = '';
  public allCheck: boolean = false;
  public beforeRedirect: string = '';
  public redirectText: string = '';
  public isItemSelected: boolean = false;
  public selectedArray: any = [];
  public masterButtonClass: string = "btn-master";
  public secondaryButtonClass: string = "btn-secondary";
  public config: any;
  public advanFilterForm: any;
  public redirectView: boolean = false;
  public redirectSelectedArray: any = [];
  dateFromPickerConfig: Partial<BsDatepickerConfig>;
  dateToPickerConfig: Partial<BsDatepickerConfig>;
  public applyButtonStatus: any = '';
  constructor(public utils: UtilsService, public router: Router, public route: ActivatedRoute, public http: HttpClient, public listService: OrderListService, public loaderService: LoaderService) {
  }

  ngOnInit() {
    this.config = this.listService.config;
    this.initializeOrderList();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['refreshData']) {
      this.config = (this.config) ? this.config : this.listService.config;
      this.fetchStatusOrderList(this.config.method);
    }
  }
  /**
   * initializeOrderList
   */
  public initializeOrderList = () => {
    this.populateSalesOrderGrid();
    this.filterFormsControls();
    this.defaultPageSettings();
  }
  /**
   * defaultPageSettings
   */
  public defaultPageSettings = () => {
    this.pageLimitArray = this.config.perPageArray;
    this.redirectText = this.config.redirect;
    this.beforeRedirect = this.config.beforeRedirect;
    this.placeholder = this.config.globalPlaceholder;
    if (this.defaultFilter) {
      this.filterForm.controls[this.defaultFilter].setValue(this.defaultFilterValue);
      this.adavancedArray.push({ key: this.defaultFilter, value: this.filterForm.controls[this.defaultFilter].value, label: 'Status' })
    }
  }
  /**
   * filterFormsControls
   */
  public filterFormsControls = () => {
    let formGrp: any = {};
    this.advanFilterForm = this.config.filterForm;
    this.advanFilterForm.forEach((item) => {
      formGrp[item.dataIndex] = new FormControl('');
    });
    this.filterForm = new FormGroup(formGrp);
  }
  ngDoCheck() {
    this.dateFromPickerConfig = Object.assign({}, { maxDate: this.filterForm.controls['toDate'].value, dateInputFormat: 'DD/MM/YYYY' });
    this.dateToPickerConfig = Object.assign({}, { minDate: this.filterForm.controls['fromDate'].value, dateInputFormat: 'DD/MM/YYYY' });
  }
  /**
   * populateSalesOrderGrid
   */
  public populateSalesOrderGrid = () => {
    this.columnDefs = this.config.gridConfigs;
  }
  /**
   * fetchStatusOrderList
   */
  public fetchStatusOrderList = (method : string) => {
    this.listData = [];
    this.listService.getOrderList(method).subscribe((response) => {
      this.listData = response[this.responseKey];
      this.filterSOData();
      this.loaderService.hide();
    }, (error) => {
      // this.listData = [{
      //   "orderId": "15",
      //   "volume": 50,
      //   "deliveryDate": "2018-05-10",
      //   "status": "Under Process"
      // }, {
      //   "orderId": "13",
      //   "volume": 50,
      //   "deliveryDate": "04/05/2018",
      //   "status": "Failed"
      // }, {
      //   "orderId": "12",
      //   "volume": 50,
      //   "deliveryDate": "2018-05-08",
      //   "status": "Queued"
      // }, {
      //   "orderId": "11",
      //   "volume": 50,
      //   "deliveryDate": "2018-05-10",
      //   "status": "Queued"
      // }, {
      //   "orderId": "10",
      //   "volume": 50,
      //   "deliveryDate": "2018-05-05",
      //   "status": "Queued"
      // }, {
      //   "orderId": "1",
      //   "volume": 50,
      //   "deliveryDate": "2018-05-08",
      //   "status": "Queued"
      // }, {
      //   "orderId": "1",
      //   "volume": 50,
      //   "deliveryDate": "2018-05-10",
      //   "status": "Queued"
      // }, {
      //   "orderId": "1",
      //   "volume": 50,
      //   "deliveryDate": "2018-05-05",
      //   "status": "Queued"
      // }, {
      //   "orderId": "1",
      //   "volume": 50,
      //   "deliveryDate": "2018-05-08",
      //   "status": "Queued"
      // }, {
      //   "orderId": "1",
      //   "volume": 50,
      //   "deliveryDate": "2018-05-10",
      //   "status": "Queued"
      // }, {
      //   "orderId": "1",
      //   "volume": 50,
      //   "deliveryDate": "2018-05-05",
      //   "status": "Queued"
      // }, {
      //   "orderId": "1",
      //   "volume": 50,
      //   "deliveryDate": "2018-05-08",
      //   "status": "Queued"
      // }, {
      //   "orderId": "1",
      //   "volume": 50,
      //   "deliveryDate": "2018-05-10",
      //   "status": "Queued"
      // }, {
      //   "orderId": "1",
      //   "volume": 50,
      //   "deliveryDate": "2018-05-05",
      //   "status": "Queued"
      // }, {
      //   "orderId": "1",
      //   "volume": 50,
      //   "deliveryDate": "2018-05-08",
      //   "status": "Queued"
      // }, {
      //   "orderId": "1",
      //   "volume": 50,
      //   "deliveryDate": "2018-05-10",
      //   "status": "Queued"
      // }, {
      //   "orderId": "1",
      //   "volume": 50,
      //   "deliveryDate": "2018-05-05",
      //   "status": "Queued"
      // }, {
      //   "orderId": "1",
      //   "volume": 50,
      //   "deliveryDate": "2018-05-08",
      //   "status": "Queued"
      // }, {
      //   "orderId": "1",
      //   "volume": 50,
      //   "deliveryDate": "2018-05-10",
      //   "status": "Queued"
      // }, {
      //   "orderId": "1",
      //   "volume": 50,
      //   "deliveryDate": "2018-05-05",
      //   "status": "Queued"
      // }, {
      //   "orderId": "1",
      //   "volume": 50,
      //   "deliveryDate": "2018-05-08",
      //   "status": "Queued"
      // }, {
      //   "orderId": "1",
      //   "volume": 50,
      //   "deliveryDate": "2018-05-10",
      //   "status": "Queued"
      // }, {
      //   "orderId": "1",
      //   "volume": 50,
      //   "deliveryDate": "2018-05-05",
      //   "status": "Queued"
      // }, {
      //   "orderId": "1",
      //   "volume": 50,
      //   "deliveryDate": "2018-05-08",
      //   "status": "Queued"
      // }];
      this.listData = [];
      this.filterSOData();
    });

    //this.modifySoData(this.listData);
  }
  /**
   * sortGridData
   */
  public sortGridData = (prop: any) => {
    let me = this;
    this.listData.sort((a, b) => {
      return me.utils.sort(a, b, prop.property, prop.direction);
    });
    this.filterSOData();
  }
  /**
   * 
   */
  public previousPage = () => {
    this.defaultPage = this.defaultPage - 1;
    this.filterSOData();
  }
  /**
   * 
   */
  public nextPage = () => {
    this.defaultPage = this.defaultPage + 1;
    this.filterSOData();
  }
  /**
   * 
   */
  public goToPage = ($event) => {
    this.defaultPage = Number($event);
    this.filterSOData();
  }
  /**
   * 
   */
  public pageLimitChange = (count: number) => {
    this.pageLimit = count;
    this.defaultPage = 1;
    this.filterSOData();
  }
  /**
   * 
   */
  public modifySoData = (ary: any) => {
    this.totalRecords = ary.length;
    this.data = this.utils.sliceArray(ary, (this.defaultPage - 1) * this.pageLimit, this.defaultPage * this.pageLimit);
  }
  /**
   * searchData
   */
  public searchData = (val) => {
    this.globalSearchText = val;
    this.defaultPage = 1;
    this.filterSOData();
    // this.data = this.utils.filterArray(this.listData,)
  }
  /**
   * displayFilterOptions
   */
  public displayFilterOptions = () => {
    this.displayFilterOption = !this.displayFilterOption;
  }
  /**
   * applyFilter
   */
  public applyFilter = () => {
    if (this.displayErrorMessages({ dataIndex: 'volumeFrom' })) {
      return false;
    }
    let me = this;
    me.adavancedArray = [];
    let filterKeys = Object.keys(me.filterForm.controls);
    filterKeys.forEach((item) => {
      let label: any = '';
      label = this.cardLabel(item);
      (me.filterForm.controls[item].value && me.filterForm.controls[item].value != '') ? me.adavancedArray.push({ key: item, value: me.filterForm.controls[item].value, label: label }) : '';
    });
    this.defaultPage = 1;
    this.filterSOData();
    this.displayFilterOptions();

  }
  /**
   * cardLabel
   */
  public cardLabel = (item: any): string => {
    let result: string;
    switch (item.toLowerCase()) {
      case 'volumefrom': result = 'Volume From'; break;
      case 'volumeto': result = "Volume To"; break;
      case 'fromdate': result = "Delivery Date From"; break;
      case 'todate': result = "Delivery Date To"; break;
      case 'status': result = "Status"; break;
      case 'orderid': result = "Id"; break;
      default: result = ""; break;
    }
    return result;
  }
  /**
   * clearFilter
   */
  public clearFilter = () => {
    this.adavancedArray = [];
    this.filterForm.reset();
    this.defaultPage = 1;
    this.filterSOData();
    this.displayFilterOptions();
  }
  /**
   * filterSOData
   */
  public filterSOData = () => {
    let searchArray: any = this.listData.length > 0 ? Object.keys(this.listData[0]) : [];
    let filteredArry = this.utils.filterArray(this.listData, this.globalSearchText, searchArray, 'or',true);
    filteredArry = this.adavancedArray.length > 0 ? this.applyMultipleFilter(filteredArry) : filteredArry;
    this.modifySoData(filteredArry);
  }
  /**
   * applyMultipleFilter
   */
  public applyMultipleFilter = (ary: any[]): any[] => {
    let filterAry: any = ary;
    this.adavancedArray.forEach((obj) => {
      filterAry = ['volumefrom', 'volumeto', 'fromdate', 'todate'].indexOf(obj.key.toLowerCase()) === -1 ? this.utils.filterArray(filterAry, obj.value, [obj.key], 'and',false) : this.filterArrayBasedOnConidition(filterAry, obj);
    });
    return filterAry;
  }
  /**
   * filterArrayBasedOnConidition
   */
  public filterArrayBasedOnConidition = (ary: any, obj: any): any[] => {
    let filteredArry: any = ary;
    switch (obj.key.toLowerCase()) {
      case 'fromdate': filteredArry = this.utils.filterArrayRangeBased(ary, 'deliveryDate', obj.value, 'greaterorequaltodate',false);
        break;
      case 'todate': filteredArry = this.utils.filterArrayRangeBased(ary, 'deliveryDate', obj.value, 'lesserorequaltodate',false);
        break;
      case 'volumeto': filteredArry = this.utils.filterArrayRangeBased(ary, 'volume', obj.value, 'lesserorequalto',false);
        break;
      case 'volumefrom': filteredArry = this.utils.filterArrayRangeBased(ary, 'volume', obj.value, 'greaterorequalto',false);
        break;
    }
    return filteredArry;
  }
  /**
   * allSOSelected
   */
  public allSOSelected = (a) => {
    this.selectedArray = [];
    this.allCheck = !this.allCheck;
    this.listData.forEach((item) => {
      item.selected = this.allCheck && !this.config.checkboxDisable(item);
      item.selected ? this.selectedArray.push(item) : '';
    });
  }
  /**
   * generateOrders
   */
  public generateOrders = () => {
    this.redirectSelectedArray = JSON.parse(JSON.stringify(this.selectedArray));
    this.generateOrdersEvent.emit(this.redirectSelectedArray);
  }
  /**
   * redirect
   */
  public redirect = () => {
    this.redirectSelectedArray = JSON.parse(JSON.stringify(this.selectedArray));
    this.redirectEvent.emit(this.redirectSelectedArray);
  }
  /**
   * rowSelected
   */
  public rowSelected = (item) => {
    this.populateSelectedArray(item);
  }
  /**
   * populateSelectedArray
   */
  public populateSelectedArray = (item: any) => {
    let index = this.utils.fetchObjectFromAnArray(this.listData, item, 'orderId');
    this.listData[index].selected = !this.listData[index].selected;
    if (this.listData[index].selected) {
      this.selectedArray.push(this.listData[index]);
    } else {
      let selectedIndx = this.utils.fetchObjectFromAnArray(this.selectedArray, item, 'orderId');
      this.selectedArray.splice(selectedIndx, 1);
    }
    this.allCheck = this.selectedArray.length === this.listData.length;
  }
  /**
   * removeFilter
   */
  public removeFilter = (item) => {
    let index = this.utils.fetchObjectFromAnArray(this.adavancedArray, item.value, "key");
    this.filterForm.controls[item.value.key].setValue('');
    this.adavancedArray.splice(index, 1);
    this.defaultPage = 1;
    this.filterSOData();
  }
  /**
   * ifDateField
   */
  public ifDateField = (item: any) => {
    return item.dataIndex.toLowerCase().indexOf('date') > -1;
  }
  /**
   * datePickerConfig
   */
  public datePickerConfig = (item: any) => {
    return item.key.toLowerCase().indexOf('to') ? this.dateFromPickerConfig : this.dateToPickerConfig;
  }
  /**
   * onKeyUp
   */
  public onBlur = (e: any): any => {
    if (e.target.name.toLowerCase().indexOf('volume') > -1 && this.filterForm.controls['volumeFrom'].value != '' && this.filterForm.controls['volumeTo'].value != '' && this.filterForm.controls['volumeFrom'].value > this.filterForm.controls['volumeTo'].value) {
      e.target.value = "";
      e.target.focus();
    }
  }
  /**
   * cellClick
   */
  public cellClick = (cell: any) => {
    switch (cell.dataIndex.toLowerCase()) {
      case 'orderid': this.navigateToPO(cell); break;
    }
  }
  /**
   * name
   */
  public navigateToPO = (cell: any) => {
    this.router.navigate(['po-details', cell.id]);
  }
  /**
   * displayErrorMessages
   */
  public displayErrorMessages = (item) => {
    if ((item.dataIndex === 'volumeFrom' || item.dataIndex === 'volumeTo') && (this.filterForm.controls['volumeFrom'].value != '' && this.filterForm.controls['volumeTo'].value != '') && (Number(this.filterForm.controls['volumeFrom'].value) > Number(this.filterForm.controls['volumeTo'].value))) {
      return true;
    } else {
      return false;
    }
  }
}
