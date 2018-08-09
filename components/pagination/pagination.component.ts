import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() page: number; // the current page
  @Input() count: number; // how many total items there are in all pages
  @Input() perPage: number; // how many items we want to show per page
  @Input() pagesToShow: number; // how many pages between next/prev
  @Input() pageLimitArray: any = [];
  @Output() goPrev = new EventEmitter<boolean>();
  @Output() goNext = new EventEmitter<boolean>();
  @Output() goPage = new EventEmitter<number>();
  @Output() changeInPerPage = new EventEmitter<number>();
  public currentPageCount: number;
  constructor() { }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['count']) {
      this.count = this.count;
      this.calculateCurrentPageCount();
    }
  }
  ngOnInit() {
    this.calculateCurrentPageCount();
    
  }
  /**
   * calculateCurrentPageCount
   */
  public calculateCurrentPageCount = () => {
    this.currentPageCount = (!this.lastPage()) ? this.perPage * this.page : this.count;
  }
  /**
   * getMin
   */
  public getMin = (): number => {
    return ((this.perPage * this.page) - this.perPage) + 1;
  }
  /**
   * getMax
   */
  public getMax = (): number => {
    let max = this.perPage * this.page;
    if (max > this.count) {
      max = this.count;
    }
    return max;
  }
  /**
   * onPage
   */
  public onPage = (n: number): void => {
    this.page = n;
    this.calculateCurrentPageCount();
    this.goPage.emit(n);
  }
  /**
   * onPrev
   */
  public onPrev = (): void => {
    this.page = this.page - 1;
    this.calculateCurrentPageCount();
    this.goPrev.emit(true);
  }
  /**
   * onNext 
   */
  public onNext = (next: boolean): void => {
    this.page = this.page + 1;
    this.calculateCurrentPageCount();
    this.goNext.emit(next);
  }
  /**
   * totalPages
   */
  public totalPages = (): number => {
    return Math.ceil(this.count / this.perPage) || 0;
  }
  /**
   * lastPage
   */
  public lastPage = (): boolean => {
    return this.perPage * this.page >= this.count;
  }
  /**
   * getPages
   */
  public getPages = (): number[] => {
    const c = Math.ceil(this.count / this.perPage);
    const p = this.page || 1;
    const pagesToShow = this.pagesToShow || 9;
    const pages: number[] = [];
    pages.push(p);
    const times = pagesToShow - 1;
    for (let i = 0; i < times; i++) {
      if (pages.length < pagesToShow) {
        if (Math.min.apply(null, pages) > 1) {
          pages.push(Math.min.apply(null, pages) - 1);
        }
      }
      if (pages.length < pagesToShow) {
        if (Math.max.apply(null, pages) < c) {
          pages.push(Math.max.apply(null, pages) + 1);
        }
      }
    }
    pages.sort((a, b) => a - b);
    return pages;
  }
  /**
   * onPageSelect
   */
  public onPageSelect = (...n) => {
    this.perPage = Number(n[0]);
    this.calculateCurrentPageCount();
    this.changeInPerPage.emit(this.perPage);
  }
}
