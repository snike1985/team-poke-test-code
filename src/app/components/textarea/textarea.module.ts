import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {InputOnfocusModule} from '../../directives/input.onfocus.module';
import {TextareaComponent} from './textarea';


@NgModule({
    declarations: [
        TextareaComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        InputOnfocusModule,
        IonicModule
    ],
    exports: [
        TextareaComponent
    ]
})
export class TextareaComponentModule {
}
