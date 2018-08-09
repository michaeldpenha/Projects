import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  public onClose: Subject<boolean>;

  @Input() modalMessage: string;
  @Input() headerMsg: string;
  @Input() enableCancelBtn: boolean;
  @Input() enableSuccessBtn: boolean;
  @Input() successButtonText: string;
  @Input() cancelButtonTxt: string;
  @Input() redirectPopUp: boolean;
  @Input() anchorVisible: boolean;
  @Output() anchorClick = new EventEmitter<any>();
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.onClose = new Subject();
  }

  /**
    *  Method to Close PopUp Window
 **/
  public onCancel = (): void => {
    this.onClose.next(false);
    this.bsModalRef.hide();
  }

  /**
     *  Method for Ok button
  **/
  public onClickOk(): void {
    this.onClose.next(false);
    this.bsModalRef.hide();
  }
  /**
   * onAnchorClick
   */
  public onAnchorClick = (): void => {
    this.onClose.next(false);
    this.bsModalRef.hide();
    this.anchorClick.emit();
  }
}
