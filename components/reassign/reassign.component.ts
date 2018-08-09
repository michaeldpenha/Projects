import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { ReassignService } from './reassign.service';
import { UtilsService,LoaderService } from '../../services/index';
import {endPoints} from '../../constants/index';
@Component({
  selector: 'app-reassign',
  templateUrl: './reassign.component.html',
  styleUrls: ['./reassign.component.scss']
})
export class ReassignComponent implements OnInit {
  constructor(protected reassignService: ReassignService, private utils: UtilsService, private loadingService : LoaderService) { }
  @Input('selectionArray') selectedArray: any;
  @Input() selectedKey : string;
  @Input() headerText: string;
  @Input() selectionText: string;
  @Input() parentCmp : string;
  @Input() selectionType : string = "radio";
  @Output() onCancelClick = new EventEmitter<any>();
  @Output() redirectTrigger = new EventEmitter<any>();
  reassignForm: FormGroup;
  public showHide: boolean = true;
  public isClientManagerRequired : boolean = false;
  public showDropdown: boolean = false;
  public satellites: any = [];
  public redirectionMedium: string = '';
  public param: any;
  public clientMachine : any;
  public clientMachineSelected : any = [];
  
  ngOnInit() {
    this.initializeForm();
    this.fetchSatelliteInfo();
    this.isClientManagerRequired = this.isRedirectionMediumRequired();
    (this.isClientManagerRequired) ? this.fetchClientInfo() : '';
  }
  /**
   * initializeForm
   */
  public initializeForm = () => {
    this.reassignForm = new FormGroup({
      so: new FormControl(''),
      externalSatellite: new FormControl('')
    });
    this.redirectionMedium = 'satellite';
  }
  /**
   * fetchSatelliteInfo
   */
  public fetchSatelliteInfo = () => {
    this.reassignService.getSatellite().subscribe(
      (response) => {
        this.satellites = response.satellites;
        this.loadingService.hide();
      },
      (error) => {
        console.log(error)
      }
    );
  }
  /**
   * fetchClientInfo
   */
  public fetchClientInfo = () => {
    this.reassignService.getClientMachines().subscribe(
      (response) => {
        //response.clientMachines
        this.clientMachine = response.clientMachines;
        this.loadingService.hide();
      },
      (error) => {
      }
    );
  }
  checkType = () => {
    this.redirectionMedium = this.reassignForm.controls.so.value;
    this.clientMachineSelected = [];
  }

  onSubmitReassign(reassignForm) {
    if (this.isFormValid()) {
      let obj = this.fetchPatchUrl();
      this.param = this.manipulateParam(obj);
      this.reAssign(obj.url);
    }

  }
  /**
   * isFormValid 
   */
  public isFormValid = (): boolean => {
    let result = false;
    result = this.fetchValueForRedirect() != '';
    return result;
  }
  /**
   * fetchValueForRedirect
   */
  public fetchValueForRedirect = (): any => {
    let result;
    switch (this.redirectionMedium.toLocaleUpperCase()) {
      case 'SATELLITE': result = this.reassignForm.controls['externalSatellite'].value; break;
      case 'CLIENT_MACHINE' : result = this.clientMachineSelected && this.clientMachineSelected.length > 0 ? this.clientMachineSelected : ''; break;
      case 'CDP': result = 'CDP'; break;
    }
    return result;
  }
  /**
   * manipulateParam
   */
  public manipulateParam = (obj: any): any => {
    let result = {};
    let medium = this.redirectionMedium.toLocaleUpperCase();
    if (medium === "SATELLITE") {
      result['satelliteId'] = this.fetchValueForRedirect();
      result[obj.keyParam] = this.toPopulateSelectedArray();
    }else if(medium === "CLIENT_MACHINE"){
      result[obj.keyParam] = this.toPopulateSelectedArray();
      result['satelliteId'] = '1';
      result['clientMachineId'] = this.clientMachineSelected[0].id;
    }
    result['redirectOption'] = medium;
    return result;
  }
  /**
   * toPopulateSelectedArray 
   */
  public toPopulateSelectedArray = () : any => {
    let selectedOrders: any = [];
    this.selectedArray.forEach((item) => {
      selectedOrders.push(item.orderId);
    });
    return selectedOrders;
  }

  /**
   * removeSelectedArray
   */
  public removeSelectedArray = (e: any, item) => {
    let index = this.utils.fetchObjectFromAnArray(this.selectedArray, item, 'orderId');
    this.selectedArray.splice(index, 1);
  }
  /**
   * onCancel
   */
  public onCancel = () => {
    this.onCancelClick.emit();
  }
  /**
   * reAssign
   */
  public reAssign = (url : string) => {
    this.reassignService.patchSoReassign(this.param,url).subscribe(
      (response) => {
        this.redirectTrigger.emit();
        this.loadingService.hide()
      },
      (error) => {
        console.log(error)
      }
    );
  }
  /**
   * disableRedirect
   */
  public disableRedirect = () : boolean => {
    let result = true;
    result = this.selectedArray.length === 0 || this.redirectionMedium == '' || this.fetchValueForRedirect() == '';
    return result; 
  }
  /**
   * showHideIcon
   */
  public showHideIcon() {
    this.showHide = !this.showHide;
  }
  /**
   * isRequired
   */
  public isRedirectionMediumRequired = () :boolean =>  {
    let result : boolean = true;
    switch(this.parentCmp && this.parentCmp.toLowerCase()){
      case 'salesorder' : result = false; break;
    }
    return result;
  }
  /**
   * recordSelected
   */
  public recordFromRadioSelection = (e : any) => {
    this.clientMachineSelected = [];
    this.clientMachineSelected.push(e);
  }
  /**
   * fetchPatchUrl
   */
  public fetchPatchUrl = () : any => {
    let url : string = `${endPoints.baseUrl}/${endPoints.urlPath.issuers}`;
    let keyParam : string;
    switch(this.parentCmp && this.parentCmp.toLowerCase()){
      case 'salesorder' : url = url + '/1/reassign-sales-orders';keyParam = 'salesOrderIds'; break;
      case 'productionorder' : url = url + '/1/reassign-production-orders';keyParam = 'productionOrderIds';break;
    }
    return {url : url,keyParam : keyParam};
  }
}
