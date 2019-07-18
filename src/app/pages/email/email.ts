import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';
import {ApiService} from '../../services/api.service';

@Component({
    selector: 'tp-page-email',
    templateUrl: 'email.html'
})
export class EmailPage implements OnInit {
    public loginForm: FormGroup;
    public isLoad = false;

    constructor(private router: Router,
                private formBuilder: FormBuilder,
                private apiService: ApiService,
                private alertController: AlertController) {

    }

    public ngOnInit(): void {
        const emailRegExp = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

        this.loginForm = this.formBuilder.group({
            userEmail: new FormControl(null, [Validators.required, Validators.pattern(emailRegExp)])
        });
    }

    public submitForm(): void {
        const data = {
            email: this.loginForm.controls['userEmail'].value
        };

        this.isLoad = true;

        this.apiService.sendOTP(data).subscribe(
            () => {
                this.isLoad = false;
                this.router.navigate(['authorization/auth-code', data]);
            },
            (err) => {
                this.isLoad = false;
                if (err.status === 404) {
                    this.showErrorAlert('Человек с такой почтой не найден');
                } else {
                    this.showErrorAlert('Ошибка загрузки');
                }
            });
    }

    async showErrorAlert(text = 'Неизвестная ошибка') {
        const alert = await this.alertController.create({
            header: text,
            buttons: ['OK']
        });

        await alert.present();
    }
}
