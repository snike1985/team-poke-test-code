import {NgModule} from '@angular/core';

import {ProfilePage} from './profile';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {UserPokesModule} from '../../components/user-pokes/user-pokes.module';
import {ScrolledHeaderDirectiveModule} from '../../directives/scrolled.header.module';
import {CustomRefresherModule} from '../../components/custom-refresher/custom-refresher.module';

@NgModule({
    declarations: [
        ProfilePage
    ],
    imports: [
        CommonModule,
        IonicModule,
        ScrolledHeaderDirectiveModule,
        RouterModule.forChild([{path: '', component: ProfilePage}]),
        UserPokesModule,
        CustomRefresherModule
    ],
})
export class ProfilePageModule {
}
