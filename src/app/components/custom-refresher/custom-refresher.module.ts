import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';

import {CustomRefresherComponent} from './custom-refresher';

@NgModule({
    declarations: [
        CustomRefresherComponent,
    ],
    exports: [
        CustomRefresherComponent
    ],
    imports: [
        IonicModule,
        CommonModule
    ]
})
export class CustomRefresherModule {
}
