import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {Location} from '@angular/common';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isNavbarIcon : any;
  constructor(private _location: Location) { }

   ngOnInit() {
     this.isNavbarIcon = this._location.path();
   }


  expandSidebar(){
    if($(window).width()<=767){

      $('.side-bar-nav').toggle();
    }
    
  //var togglewidth = $(".side-bar-nav").width() == 90 ? "282px" : '90px';
   $('.side-bar-nav').toggleClass("menu-expand");

   $('.side-bar-nav span').toggle();
 
  }

  }

