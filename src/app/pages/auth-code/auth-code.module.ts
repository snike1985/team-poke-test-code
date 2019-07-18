import {NgModule} from '@angular/core';

import {AuthCodePage} from './auth-code';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        AuthCodePage
    ],
    imports: [
        CommonModule,
        IonicModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: AuthCodePage}])
    ],
})
export class AuthCodePageModule {
}
