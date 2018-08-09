import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progress-status',
  templateUrl: './progress-status.component.html',
  styleUrls: ['./progress-status.component.scss']
})
export class ProgressStatusComponent implements OnInit {

 
  @Input('progressStatus') progressStatus: string;
  public deafultProgressStatus: string = '30%';

  constructor() { }
  
  ngOnInit() {
    this.progressStatus = (this.progressStatus) ? this.progressStatus : this.deafultProgressStatus;
  }

}
