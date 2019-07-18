import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TabsPage} from './tabs.page';
import {TabsPageRoutingModule} from './tabs.router.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        TabsPageRoutingModule
    ],
    declarations: [TabsPage]
})
export class TabsPageModule {
}
