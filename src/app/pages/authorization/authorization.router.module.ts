import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthorizationPage} from './authorization.page';

const routes: Routes = [
    {
        path: '',
        component: AuthorizationPage,
        children: [
            {
                path: 'greet',
                loadChildren: '../greet/greet.module#GreetPageModule'
            },
            {
                path: 'email',
                loadChildren: '../email/email.module#EmailPageModule'
            },
            {
                path: 'auth-code',
                loadChildren: '../auth-code/auth-code.module#AuthCodePageModule'
            },
            {
                path: '',
                redirectTo: 'greet',
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
export class AuthorizationRouterModule {
}
