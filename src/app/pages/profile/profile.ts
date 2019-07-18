import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {VisibilityChanged} from '../../configs/animations.config';
import {IUserInterface} from '../../interfaces/user.interface';
import {SecureStorageService} from '../../services/secure-storage.service';
import {Router} from '@angular/router';
import {IPokeInterface} from '../../interfaces/poke.interface';
import {AlertController} from '@ionic/angular';

@Component({
    selector: 'tp-page-profile',
    templateUrl: 'profile.html',
    animations: [VisibilityChanged]
})
export class ProfilePage implements OnInit {
    public user: IUserInterface;
    public isLoaded = false;
    public loading = true;
    public pokesLoaded = false;
    public userPokes: IPokeInterface[];

    constructor(
        private apiService: ApiService,
        private secureStorageService: SecureStorageService,
        private router: Router,
        private alertController: AlertController
    ) {
        this.loadingContent();
    }

    public ngOnInit(): void {
    }

    public getPersonPokes(event?) {
        this.apiService.getPersonPokes(this.user.ID).subscribe(
            (pokes: IPokeInterface[]) => {
                console.log('pokes', pokes);
                this.userPokes = pokes;
                this.pokesLoaded = true;

                if (event) {
                    event.target.complete();
                }
            },
            (err) => {
                console.log(err);
                this.userPokes = [];
                this.pokesLoaded = true;

                if (event) {
                    event.target.complete();
                }
            });
    }

    private logOut(): void {
        this.apiService.deleteSession().subscribe(
            (res: any) => {
                console.log('session have deleted', res);
                this.secureStorageService.removeItemFromStorage('tp-token');
                this.router.navigate(['/authorization']);
            },
            (err) => {
                console.log('session have not deleted', err);
                this.logOutWrong();
            });
    }

    public loadingContent(event?) {
        this.apiService.getMe().subscribe(
            (res: any) => {
                console.log(res);
                this.user = res;
                this.isLoaded = true;
                this.loading = false;

                this.getPersonPokes(event);
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

    async showLogOutAlert() {
        const alert = await this.alertController.create({
            header: 'Вы действительно хотите выйти?',
            buttons: [
                {
                    text: 'Нет'
                },
                {
                    text: 'Да',
                    handler: () => {
                        this.logOut();
                    }
                }
            ]
        });

        await alert.present();
    }

    async logOutWrong() {
        const alert = await this.alertController.create({
            header: 'Ошибка, попробуйте позже!',
            buttons: ['Ok']
        });

        await alert.present();
    }
}
