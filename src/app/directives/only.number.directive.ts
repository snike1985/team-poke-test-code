import {Directive, HostListener, Input} from '@angular/core';
import {AbstractControl, FormControl, NgControl} from '@angular/forms';

@Directive({
    selector: '[sfOnlyNumber]'
})
export class OnlyNumberDirective {

    @Input() public numericType: string; // number | decimal

    private regex = {
        number: new RegExp(/^\d+$/),
        decimal: new RegExp(/^[0-9]+(\.[0-9]*){0,1}$/g)
    };
    //
    private specialKeys = {
        number: [ 'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight' ],
        decimal: [ 'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight' ],
    };

    constructor(private control: NgControl) {
    }

    @HostListener('keydown', [ '$event' ])
    public onKeyDown(event: KeyboardEvent) {

        const key: any = event.key !== 'Unidentified' ? event.key : '';

        if (this.specialKeys[this.numericType].indexOf(event.key) !== -1) {
            return;
        }

        const current: string = this.control.control.value;
        const next: string = current.concat(key);

        if (next && !String(next).match(this.regex[this.numericType])) {
            event.preventDefault();
        }
    }

    @HostListener('ionChange', [ '$event' ])
    public ionChange() {

        const regExp = new RegExp(/^\d+$/);
        let currentValue: string = this.control.control.value;

        if (!regExp.test(currentValue)) {

            currentValue = currentValue.slice(0, -1);
            this.control.control.setValue(currentValue);
        }
    }
}
