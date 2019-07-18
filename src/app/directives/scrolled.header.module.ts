import {NgModule} from '@angular/core';
import {ScrolledHeaderDirective} from './scrolled.header.directive';

@NgModule({
    declarations: [ScrolledHeaderDirective],
    exports: [ScrolledHeaderDirective]
})
export class ScrolledHeaderDirectiveModule {
}
