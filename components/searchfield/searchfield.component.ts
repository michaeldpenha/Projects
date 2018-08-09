import { Component, OnInit , Input , Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-searchfield',
  templateUrl: './searchfield.component.html',
  styleUrls: ['./searchfield.component.scss']
})
export class SearchfieldComponent implements OnInit {
  @Input() placeholder : string;
  @Output() searchTrigger = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  /**
   * searchData
   */
  public searchData = (e : any) => {
    let val = e.target.value;
    this.searchTrigger.emit(val);
  }
}
