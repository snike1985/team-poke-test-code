import {Component, OnInit} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {IUserInterface} from '../../interfaces/user.interface';
import {IPokeInterface, IPostPokeInterface} from '../../interfaces/poke.interface';
import {ApiService} from '../../services/api.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {VisibilityChanged} from '../../configs/animations.config';

@Component({
    selector: 'tp-add-poke',
    templateUrl: 'add-poke.html',
    animations: [VisibilityChanged]
})

export class AddPoke implements OnInit {
    public user: IUserInterface;
    public addingPoke = false;
    public userPokes: IPokeInterface[];
    public pokeForm: FormGroup;
    public emojiArr = ['👏', '👍', '👎', '👊', '✊', '🤟', '👌', '👉', '☝️', '🖖', '🤙', '💪', '🤣', '☺️', '😍', '😛', '🤪', '🤨', '🧐', '🥳',
        '😒', '☹️', '😖', '😤', '🤯', '😳', '🤭', '😬', '🙄', '🤐', '🥴', '🤮', '💩', '🙇‍♀️', '🙇‍♂️', '🙅‍♀️', '🙅‍♂️', '🤦‍♀️', '🤦‍♂️', '🤷‍♀️',
        '🤷‍♂️', '💆‍♀️', '💆‍♂️', '💃', '🕺', '🐷', '🙈', '🐌', '🔥', '🏆', '🚀', '🇮🇱'];
    public curPoke: IPostPokeInterface = {
        ratedPersonID: null,
        rating: 0,
        description: null,
        emoji: null
    };
    public showEmojiList = false;

    constructor(
        private modalCtrl: ModalController,
        private params: NavParams,
        private formBuilder: FormBuilder,
        private apiService: ApiService
    ) {
        this.user = this.params.get('userData');
        console.log(this.user);
        this.curPoke.ratedPersonID = this.user.ID;
    }

    public ngOnInit(): void {
        this.pokeForm = this.formBuilder.group({
            rating: new FormControl(null, Validators.required),
            emoji: new FormControl(null, Validators.required),
            description: new FormControl(null, Validators.required)
        });
    }

    public closeModal(): void {
        this.modalCtrl.dismiss();
    }

    public setRating(rating) {
        this.pokeForm.controls['rating'].setValue(rating);
        this.curPoke.rating = rating;
    }

    public toggleEmojiList() {
        this.showEmojiList = !this.showEmojiList;
    }

    public setPokeEmoji(emoji) {
        this.pokeForm.controls['emoji'].setValue(emoji);
        this.curPoke.emoji = emoji;
        this.showEmojiList = false;
    }

    public addPoke() {
        this.addingPoke = true;

        this.curPoke.description = this.pokeForm.controls['description'].value;

        this.apiService.postPoke(this.curPoke).subscribe(
            (pokes: IPokeInterface[]) => {
                console.log('poke added', pokes);
                this.addingPoke = false;
                this.closeModal();
            },
            (err) => {
                console.log(err);
                this.addingPoke = false;
                this.closeModal();
            });
    }
}
