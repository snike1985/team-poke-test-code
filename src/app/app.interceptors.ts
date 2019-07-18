import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {Subscription, throwError} from 'rxjs';
import {tap} from 'rxjs/operators';
import {SecureStorageService} from './services/secure-storage.service';
import {StoreService} from './services/store.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

    private userToken: string;

    constructor(
        public secureStorageService: SecureStorageService,
        private storeService: StoreService) {
    }

    public intercept(req: HttpRequest<any>, next: HttpHandler) {

        // check to see if there's internet
        if (!window.navigator.onLine) {
            // if there is no internet, throw a HttpErrorResponse error
            // since an error is thrown, the function will terminate here
            this.storeService.isOffline.next(true);
            return throwError(new HttpErrorResponse({error: 'InternetDisconnect'}));

        } else {
            this.storeService.isOffline.next(false);

            // else return the normal request
            this.userToken = this.secureStorageService.token;

            console.log('token: ', this.userToken);

            const headers = this.userToken ? req.headers.set('Authorization', this.userToken) : null;

            console.log('headers', headers);

            req = req.clone({headers});

            return next.handle(req).pipe(
                tap(
                    event => {

                    },
                    err => {
                        if (err instanceof HttpErrorResponse) {
                            const curErr = err.error;
                            console.log('interceptor error: ', curErr);
                            console.log('interceptor error status: ', err.status);
                        }
                    }));
        }
    }
}
