import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss']
})
export class FilterPanelComponent implements OnInit {
  @Output() applyFilter = new EventEmitter<any>();
  @Output() clearFilter = new EventEmitter<any>();
  @Input() displayPanel: boolean = false;

  public applyText : string = "Apply";
  public clearText : string = "Clear";
  public masterButtonClass:string= "btn-master";
  public secondaryButtonClass:string= "btn-secondary";
  constructor() { }

  ngOnInit() {

  }
  /**
   * apply
   */
  public apply = () => {
    this.applyFilter.emit();
  }
  /**
   * clear
   */
  public clear = () => {
    this.clearFilter.emit();
  }

}
