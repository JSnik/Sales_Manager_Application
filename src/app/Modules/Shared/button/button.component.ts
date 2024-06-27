import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <button [ngClass]="className" [disabled]="isDisabled ? disabledPromise : false">{{btnValue}}</button>
  `,
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() btnValue: string = '';
  @Input() className: string = '';

  @Input() isDisabled: boolean = false;
  @Input() disabledPromise: any = '';
}
