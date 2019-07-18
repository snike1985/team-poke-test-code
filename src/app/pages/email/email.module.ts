import {NgModule} from '@angular/core';

import {EmailPage} from './email';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        EmailPage
    ],
    imports: [
        CommonModule,
        IonicModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: EmailPage}])
    ],
})
export class EmailPageModule {
}
