import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {timer, Subscription} from 'rxjs';
import {AlertController} from '@ionic/angular';

import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {SecureStorageService} from '../../services/secure-storage.service';

@Component({
    selector: 'tp-page-auth-code',
    templateUrl: 'auth-code.html'
})
export class AuthCodePage implements OnInit, OnDestroy {
    public durationConst = 30;
    public duration: number;
    public isNewCode = false;
    public isLoad = false;
    public otpForm: FormGroup;
    public userEmail: string;

    private curTimer: Subscription;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private formBuilder: FormBuilder,
                private apiService: ApiService,
                private alertController: AlertController,
                private secureStorageService: SecureStorageService) {
        this.userEmail = this.route.snapshot.paramMap.get('email');
    }

    public ngOnInit(): void {
        this.otpForm = this.formBuilder.group({
            otp: new FormControl('', [Validators.minLength(4), Validators.required])
        });
    }

    public ngOnDestroy(): void {

    }

    public ionViewDidEnter(): void {
        if (!this.curTimer) {
            this.startTimer();
        }
    }

    public submitForm(): void {
        const data = {
            email: this.userEmail,
            OTP: this.otpForm.controls.otp.value
        };

        this.isLoad = true;

        this.apiService.startSession(data).subscribe(
            (res) => {
                this.isLoad = false;
                this.secureStorageService.setTokenToStorage(res['sessionToken']);
                this.router.navigate(['/tabs']);
            },
            (err) => {
                this.isLoad = false;
                if (err.status === 400) {
                    this.showErrorAlert('Неправильный код входа');
                } else {
                    this.showErrorAlert('Ошибка загрузки');
                }
            });
    }

    public getNewCode() {
        this.isLoad = true;

        this.apiService.sendOTP({email: this.userEmail}).subscribe(
            () => {
                this.isLoad = false;
                this.startTimer();
            },
            () => {
                this.isLoad = false;
                this.showErrorAlert();
            });
    }

    private calculate(endDate) {

        const startDate: any = new Date().getTime() / 1000;
        const timeRemaining = endDate - startDate;

        if (timeRemaining >= 0) {
            return Math.ceil(timeRemaining);
        } else {
            this.stopTimer();
            this.isNewCode = true;
        }
    }

    private startTimer() {

        this.duration = this.durationConst;
        this.isNewCode = false;

        const startDate = new Date().getTime() / 1000;

        const endDate = startDate + this.durationConst;

        if (isNaN(endDate)) {
            return;
        }

        this.curTimer = timer(0, 1000).subscribe(() => {
            this.duration = this.calculate(endDate);
        });
    }

    private stopTimer(): void {
        if (this.curTimer) {
            this.curTimer.unsubscribe();
        }
    }

    async showErrorAlert(text = 'Неизвестная ошибка') {
        const alert = await this.alertController.create({
            header: text,
            buttons: ['OK']
        });

        await alert.present();
    }
}
