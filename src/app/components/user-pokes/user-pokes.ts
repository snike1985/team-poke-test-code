import {Component, Input} from '@angular/core';
import {IPokeInterface} from '../../interfaces/poke.interface';
import {ApiService} from '../../services/api.service';
import {SlideOut, VisibilityChanged} from '../../configs/animations.config';
import {StoreService} from '../../services/store.service';
import {AlertController} from '@ionic/angular';

@Component({
    selector: 'tp-user-pokes-component',
    templateUrl: 'user-pokes.html',
    animations: [VisibilityChanged, SlideOut]
})

export class UserPokesComponent {
    @Input() public userPokesList: IPokeInterface[];
    public deletingPokes = {};

    constructor(
        private apiService: ApiService,
        private storeService: StoreService,
        private alertController: AlertController
    ) {
    }

    public votePoke(poke: IPokeInterface) {
        poke.voting = true;

        if (poke.voted) {
            this.apiService.unVoteForPoke(poke.ID).subscribe(
                () => {
                    console.log('poke unVoted');
                    poke.votes--;
                    poke.voted = !poke.voted;
                    poke.voting = false;
                },
                (err) => {
                    console.log(err);
                    poke.voting = false;
                });
        } else {
            this.apiService.voteForPoke(poke.ID, {}).subscribe(
                () => {
                    console.log('poke voted');
                    poke.votes++;
                    poke.voted = !poke.voted;
                    poke.voting = false;
                },
                (err) => {
                    console.log(err);
                    poke.voting = false;
                });
        }
    }

    async confirmDeletePoke(id: number) {
        const alert = await this.alertController.create({
            header: 'Вы действительно хотите удалить свой Poke?',
            buttons: [
                {
                    text: 'Нет'
                },
                {
                    text: 'Да',
                    handler: () => {
                        this.deletePoke(id);
                    }
                }
            ]
        });

        await alert.present();
    }

    private deletePoke(id: number) {
        this.apiService.deletePoke(id).subscribe(
            (pokes: IPokeInterface[]) => {
                console.log('poke deleted', pokes);
                this.storeService.needUserUpdate.next(true);
            },
            (err) => {
                console.log(err);
            });
    }
}
