import {NgModule} from '@angular/core';

import {GreetPage} from './greet';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

@NgModule({
    declarations: [
        GreetPage
    ],
    imports: [
        CommonModule,
        IonicModule,
        RouterModule.forChild([{path: '', component: GreetPage}])
    ],
})
export class GreetPageModule {
}
