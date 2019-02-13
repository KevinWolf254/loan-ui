import { Directive, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[ngDisable]'
})
export class NgDisableDirective {

  constructor(private _ngControl : NgControl) { }

  @Input('ngDisable') set disableControl( disable : boolean ) {
    const action = disable ? 'disable' : 'enable';
    this._ngControl.control[action]();
  }
}
