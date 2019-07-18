import {NgModule} from '@angular/core';

import {TeamPage} from './team';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {UserProfile} from '../../modals/user-profile/user-profile';
import {UserProfileModule} from '../../modals/user-profile/user-profile.module';
import {ScrolledHeaderDirectiveModule} from '../../directives/scrolled.header.module';
import {CustomRefresherModule} from '../../components/custom-refresher/custom-refresher.module';

@NgModule({
    entryComponents: [
        UserProfile
    ],
    declarations: [
        TeamPage
    ],
    imports: [
        CommonModule,
        IonicModule,
        UserProfileModule,
        CustomRefresherModule,
        ScrolledHeaderDirectiveModule,
        RouterModule.forChild([{path: '', component: TeamPage}])
    ],
})
export class TeamPageModule {
}
