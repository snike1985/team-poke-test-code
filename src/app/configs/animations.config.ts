import {animate, group, state, style, transition, trigger} from '@angular/animations';
import {Platform} from '@ionic/angular';

export const VisibilityChanged: object = trigger('VisibilityChanged', [
    transition('void => *',
        [
            style({opacity: 0}),
            animate('200ms', style({opacity: 1}))
        ]),
    transition('* => void',
        [
            style({opacity: 1}),
            animate('200ms', style({opacity: 0}))
        ])
]);

export const SlideIn: object = trigger('SlideIn', [
    state('in', style({height: '*', opacity: 0})),
    transition(':leave', [
        style({height: '*', opacity: 1}),

        group([
            animate(200, style({height: 0})),
            animate('250ms linear', style({opacity: 0}))
        ])

    ]),
    transition(':enter', [
        style({height: '0', opacity: 0}),

        group([
            animate(200, style({height: '*'})),
            animate('250ms linear', style({opacity: 1}))
        ])

    ])
]);

export const SlideOut: object = trigger('SlideOut', [
    state('in', style({height: '*', opacity: 0})),
    transition(':leave', [
        style({height: '*', opacity: 1}),

        group([
            animate(200, style({height: 0})),
            animate('250ms linear', style({opacity: 0}))
        ])

    ])
]);

export const SlideAppear: object = trigger('SlideAppear', [
    state('in', style({height: '*'})),
    transition(':leave', [
        style({height: '*'}),

        group([
            animate(100, style({height: 0})),
        ])

    ]),
    transition(':enter', [
        style({height: '0'}),

        group([
            animate(100, style({height: '*'})),
        ])

    ])
]);


export const PageAppear: object = trigger('PageAppear', [
    state('in', style({transform: 'translate(0,0)', opacity: 1})),
    transition(':leave', [
        style({transform: 'translate(0,0)', opacity: 1}),

        group([
            animate('1500ms ease', style({transform: 'translate({{transX}}, {{transY}})', opacity: '{{opacity}}'})),
        ])

    ]),
    transition(':enter', [
        style({transform: 'translate({{transX}}, {{transY}})', opacity: '{{opacity}}'}),

        group([
            animate('1500ms ease', style({transform: 'translate(0,0)', opacity: 1})),
        ])

    ])
]);

export const PageHide: object = trigger('PageHide', [
    state('in', style({transform: 'translate(0,0)'})),
    transition(':leave', [
        style({transform: 'translate(0,0)', opacity: 1}),

        group([
            animate('250ms ease', style({transform: 'translate({{transX}}, {{transY}})'})),
        ])

    ]),
    transition(':enter', [
        style({transform: 'translate({{transX}}, {{transY}})'}),

        group([
            animate('200ms ease', style({transform: 'translate(0,0)'})),
        ])

    ])
]);
