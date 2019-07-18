import {Component} from '@angular/core';

@Component({
    selector: 'tp-page-greet',
    templateUrl: 'greet.html',
    styleUrls: ['greet.scss']
})
export class GreetPage {
    public slideOpts = {
        speed: 300
    };

    constructor() {}
}
