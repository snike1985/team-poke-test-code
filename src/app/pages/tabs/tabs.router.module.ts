import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {TabsPage} from './tabs.page';

const routes: Routes = [
    {
        path: '',
        component: TabsPage,
        children: [
            {
                path: 'team',
                loadChildren: '../team/team.module#TeamPageModule',
            },
            {
                path: 'profile',
                loadChildren: '../profile/profile.module#ProfilePageModule',
            },
            {
                path: '',
                redirectTo: 'team',
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class TabsPageRoutingModule {
}
