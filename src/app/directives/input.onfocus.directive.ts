import {Directive, ElementRef, HostListener} from '@angular/core';
import {IonContent} from '@ionic/angular';

@Directive({
    selector: '[sfInputOnFocus]'
})
export class InputOnfocusDirective {

    constructor(private el: ElementRef,
                private content: IonContent) {
    }

    @HostListener('ionFocus', ['$event'])
    public onFocus() {

        const elem = this.el.nativeElement;
        const offsetTop = elem.closest('fieldset').offsetTop;

        this.setCursorToEnd(elem);

        setTimeout(() => {

            if (this.content && offsetTop) {
                this.content.scrollToPoint(0, offsetTop - 100, 300);
            }

        }, 100);
    }

    public setCursorToEnd(elem) {

        setTimeout(() => {

            const input = elem.getElementsByTagName('input')[0];
            const strLength = input.value.length;

            if (input.setSelectionRange !== undefined && strLength) {
                input.setSelectionRange(strLength, strLength);
            }

        }, 10);
    }
}
