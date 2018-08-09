import { Injectable } from '@angular/core';

@Injectable()
export class GridService {
  private _columnName : any = [];
  private _sortField : string; 
  constructor() { }
  /**
   * Getters for Grid Components
   */
  get columnName(): any {
    return this._columnName;
  }
  get sortField() : string {
    return this._sortField;
  }
  /**
   * Setters for Grid components;
   */
  set columnName(col : any){
    this._columnName = col;
  }
  set sortField(field : string){
    this._sortField = field;
  }
}
