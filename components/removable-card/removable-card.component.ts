import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-removable-card',
  templateUrl: './removable-card.component.html',
  styleUrls: ['./removable-card.component.scss']
})
export class RemovableCardComponent implements OnInit {
  @Input() label : string;
  @Input() item : string;
  @Output() removeCard = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  /**
   * removeContainer 
   */
  public removeContainer = (item,key) => {
    this.removeCard.emit({key : key,value : item});
  }
  /**
   * displayLabel
   */
  public displayLabel = (item : any , label : any):string => {
    let result : string;
    result = (item) ? (item.key.toLowerCase().indexOf('date') === -1) ? item.value : moment(item.value).format('DD/MM/YYYY') : label;
    return result;
  }

}
