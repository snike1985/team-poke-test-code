import {Component} from '@angular/core';
import {Subscription} from 'rxjs';
import {StoreService} from '../../services/store.service';
import {VisibilityChanged} from '../../configs/animations.config';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss'],
    animations: [VisibilityChanged]
})
export class TabsPage {
    public isOffline = false;

    private offlineSubscription: Subscription;

    constructor(private storeService: StoreService) {
    }

    public ionViewDidEnter() {
        this.subscribeOnOffline();
    }

    public ionViewDidLeave() {
        this.offlineSubscription.unsubscribe();
    }

    private subscribeOnOffline(): void {

        this.offlineSubscription = this.storeService.isOffline.subscribe(
            (data: boolean) => {
                if (this.isOffline !== data) {
                    this.isOffline = data;
                }
            });
    }
}
