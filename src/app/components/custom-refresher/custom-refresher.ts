import {Component, EventEmitter, Output} from '@angular/core';

@Component({
    selector: 'tp-custom-refresher',
    templateUrl: './custom-refresher.html',
    styleUrls: ['./custom-refresher.scss'],
})
export class CustomRefresherComponent {
    public scaleCount = 0;

    @Output() ionRefresh = new EventEmitter<boolean>();

    public refresh(event) {
        this.ionRefresh.emit(event);
    }

    public pullRefresh(event) {
        event.target
            .getProgress()
            .then((res) => this.scaleCount = res <= 1 ? res : 1);
    }
}
