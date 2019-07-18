import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';

import {UserProfile} from './user-profile';
import {UserPokesModule} from '../../components/user-pokes/user-pokes.module';
import {AddPoke} from '../add-poke/add-poke';
import {AddPokeModule} from '../add-poke/add-poke.module';
import {ScrolledHeaderDirectiveModule} from '../../directives/scrolled.header.module';

@NgModule({
    entryComponents: [
        AddPoke
    ],
    declarations: [
        UserProfile,
    ],
    imports: [
        IonicModule,
        CommonModule,
        UserPokesModule,
        AddPokeModule,
        ScrolledHeaderDirectiveModule
    ]
})
export class UserProfileModule {
}
