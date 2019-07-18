import {Component} from '@angular/core';
import {Platform} from '@ionic/angular';
import {Router} from '@angular/router';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {ScreenOrientation} from '@ionic-native/screen-orientation/ngx';

import {SecureStorageService} from './services/secure-storage.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private secureStorageService: SecureStorageService,
        private router: Router,
        private screenOrientation: ScreenOrientation
    ) {
        this.initializeApp();
    }

    private initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.getUserToken();

            if (window.hasOwnProperty('cordova')) {
                this.screenOrientation.lock('portrait-primary');
            }
        });
    }

    private getUserToken(): void {
        this.secureStorageService
            .getTokenFromStorage()
            .subscribe(
                (token) => {
                    if (token) {
                        console.log('token', token);
                        this.router.navigate(['/tabs']);
                    } else {
                        console.log('need authorize');
                        this.router.navigate(['/authorization']);
                    }
                },
                () => {
                    console.log('error get token, need authorize');
                    this.router.navigate(['/authorization']);
                });
    }
}
