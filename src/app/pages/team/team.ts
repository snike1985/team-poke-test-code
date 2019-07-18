import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {VisibilityChanged} from '../../configs/animations.config';
import {ModalController} from '@ionic/angular';
import {UserProfile} from '../../modals/user-profile/user-profile';
import {Router} from '@angular/router';

@Component({
    selector: 'tp-page-team',
    templateUrl: 'team.html',
    animations: [VisibilityChanged]
})
export class TeamPage implements OnInit, OnDestroy {
    public users = [];
    public isLoaded = false;
    public loading = true;

    constructor(
        private apiService: ApiService,
        private modalCtrl: ModalController,
        private router: Router
    ) {

    }

    public ngOnInit(): void {
        this.loadingContent();
    }

    public ngOnDestroy(): void {

    }

    public ionViewDidEnter(): void {

    }

    public tryLoadContent() {
        this.isLoaded = false;
        this.loading = true;

        this.loadingContent();
    }

    async showUser(user) {

        if (!user.canPoke) {
            this.router.navigate(['/tabs/profile']);
        } else {
            const modal = await this.modalCtrl.create({
                component: UserProfile,
                componentProps: {user}
            });

            modal.onDidDismiss().then(() => {
                this.loadingContent();
            });

            await modal.present();
        }
    }

    public loadingContent(event?) {
        this.apiService.getAllPeople().subscribe(
            (res: any) => {
                console.log(res);
                this.users = res;
                this.isLoaded = true;
                this.loading = false;

                if (event) {
                    event.target.complete();
                }
            },
            (err) => {
                console.log(err);
                this.isLoaded = false;
                this.loading = false;

                if (event) {
                    event.target.complete();
                }
            });
    }
}
