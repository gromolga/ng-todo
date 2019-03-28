import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  public popupDisabled:boolean = false;

  @Input() public content:string = 'Default content';
  @Output() close = new EventEmitter<void>();

  popupHide() {
    this.close.emit();
  }
}

