import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';

import {UserPokesComponent} from './user-pokes';

@NgModule({
    declarations: [
        UserPokesComponent,
    ],
    exports: [
        UserPokesComponent
    ],
    imports: [
        IonicModule,
        CommonModule
    ]
})
export class UserPokesModule {
}
