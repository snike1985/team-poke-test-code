import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {AuthorizationPage} from './authorization.page';
import {AuthorizationRouterModule} from './authorization.router.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AuthorizationRouterModule
    ],
    declarations: [AuthorizationPage]
})
export class AuthorizationPageModule {
}
