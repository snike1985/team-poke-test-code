import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {SecureStorage, SecureStorageObject} from '@ionic-native/secure-storage/ngx';

@Injectable({
    providedIn: 'root'
})
export class SecureStorageService {
    public token: string;

    constructor(private secureStorage: SecureStorage) {
    }

    public getTokenFromStorage() {

        if (window.hasOwnProperty('cordova')) {

            return new Observable((observer) => {

                this.secureStorage.create('team-poke')
                    .then(
                        (storage: SecureStorageObject) => {

                            storage.get('tp-token').then(
                                (data: string) => {
                                    this.token = data;
                                    observer.next(data);
                                    observer.complete();
                                },
                                (err) => {
                                    observer.error();
                                }
                            );

                        },
                        (err) => {
                            observer.error();
                        })
                    .catch((err) => {
                        // alert('The device is not secured');
                    });
            });
        } else {

            return new Observable((observer) => {
                const token = localStorage.getItem('tp-token');
                this.token = token;
                observer.next(token);
                observer.complete();
            });
        }
    }

    public setTokenToStorage(token: string): void {

        this.token = token;

        if (window.hasOwnProperty('cordova')) {

            this.secureStorage.create('team-poke')
                .then((storage: SecureStorageObject) => {
                    storage.set('tp-token', String(token));
                })
                .catch((err) => {
                    // alert('The device is not secured');
                });

        } else {
            localStorage.setItem('tp-token', token);
        }
    }

    public removeItemFromStorage(key: string): void {

        if (window.hasOwnProperty('cordova')) {

            this.secureStorage.create('team-poke')
                .then((storage: SecureStorageObject) => {
                    storage.keys().then((keys) => {

                        console.log(keys);
                        if (keys.find((k) => k === key)) {
                            storage.remove(key);
                        }
                    });
                });

        } else {
            localStorage.removeItem(key);
        }

        if (this[key]) {
            this[key] = '';
        }
    }
}
