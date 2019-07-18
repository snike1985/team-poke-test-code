import {Component, NgZone, OnInit} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {IUserInterface} from '../../interfaces/user.interface';
import {IPokeInterface} from '../../interfaces/poke.interface';
import {ApiService} from '../../services/api.service';
import {AddPoke} from '../add-poke/add-poke';
import {StoreService} from '../../services/store.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'tp-user-profile',
    templateUrl: 'user-profile.html'
})

export class UserProfile implements OnInit {
    public user: IUserInterface;
    public pokesLoaded = false;
    public userPokes: IPokeInterface[];

    private userUpdateSubscription: Subscription;

    constructor(private modalCtrl: ModalController,
                private params: NavParams,
                private apiService: ApiService,
                private storeService: StoreService,
                private ngZone: NgZone) {
        this.user = this.params.get('userData');
    }

    public ngOnInit(): void {
        this.getUserPokes();
    }

    public ionViewDidEnter() {
        this.subscribeOnUserUpdate();
    }

    public ionViewDidLeave() {
        this.userUpdateSubscription.unsubscribe();
    }

    public closeModal(): void {
        this.modalCtrl.dismiss();
    }

    public tryLoadPokes() {
        this.pokesLoaded = false;

        this.getUserPokes();
    }

    async addPoke() {
        const userData = this.user;

        const modal = await this.modalCtrl.create({
            component: AddPoke,
            componentProps: {userData}
        });

        modal.onDidDismiss().then(() => {
            this.getUserPokes();
            this.getUser();
        });

        await modal.present();
    }

    private getUserPokes() {
        this.apiService.getPersonPokes(this.user.ID).subscribe(
            (pokes: IPokeInterface[]) => {
                console.log('pokes', pokes);
                this.ngZone.run(() => this.userPokes = pokes);
                this.pokesLoaded = true;
            },
            (err) => {
                console.log(err);
                this.pokesLoaded = true;
            });
    }

    private getUser() {
        this.apiService.getPerson(this.user.ID).subscribe(
            (user: IUserInterface) => {
                console.log('user', user);
                this.user = user;
            },
            (err) => {
                console.log(err);
            });
    }

    private subscribeOnUserUpdate(): void {

        this.userUpdateSubscription = this.storeService.needUserUpdate.subscribe(
            (data: boolean) => {

                if (data) {
                    this.getUser();
                    this.getUserPokes();
                }
            }
        );
    }
}
