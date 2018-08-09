import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  isNavbarIcon : any;
  constructor(private _location: Location) { }
  
  ngOnInit() {
     this.isNavbarIcon = this._location.path();
  }

}
