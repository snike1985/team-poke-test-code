import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {IonContent} from '@ionic/angular';

@Component({
    selector: 'tp-textarea',
    templateUrl: 'textarea.html'
})
export class TextareaComponent {

    @Input() public maxHeight?: number;
    @Input() public placeholderText = '';
    @Input() public control: FormControl;
    @Input() public content: IonContent;

    constructor() {
        console.log(this.placeholderText);
    }

    public text: string;

    public resize(event?) {

        const textarea = event.target;

        if (!this.maxHeight || this.maxHeight && this.maxHeight >= textarea.scrollHeight) {
            // textarea.style.overflow = 'hidden';
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + 'px';
        }
    }
}
