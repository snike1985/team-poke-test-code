import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
    selector: '[tpScrolledHeader]'
})
export class ScrolledHeaderDirective {
    private content: HTMLElement;
    private headerHeight = 70;

    constructor(private element: ElementRef) {
        this.content = this.element.nativeElement;
    }

    @HostListener('ionScroll', ['$event'])
    private handleIonScroll(event: any) {
        const scrollTop = event.detail.scrollTop;

        if (scrollTop > this.headerHeight) {
            this.content.classList.add('show-fixed-header');
        } else {
            this.content.classList.remove('show-fixed-header');
        }
    }

}
