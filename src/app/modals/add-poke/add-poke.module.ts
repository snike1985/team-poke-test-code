import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AddPoke} from './add-poke';
import {TextareaComponentModule} from '../../components/textarea/textarea.module';

@NgModule({
    declarations: [
        AddPoke,
    ],
    imports: [
        IonicModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        TextareaComponentModule
    ]
})
export class AddPokeModule {
}
