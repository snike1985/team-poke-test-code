import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {registerLocaleData} from '@angular/common';
import localeRu from '@angular/common/locales/ru';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {SecureStorage} from '@ionic-native/secure-storage/ngx';
import {ScreenOrientation} from '@ionic-native/screen-orientation/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ApiService} from './services/api.service';
import {SecureStorageService} from './services/secure-storage.service';
import {AppInterceptor} from './app.interceptors';
import {StoreService} from './services/store.service';

registerLocaleData(localeRu, 'ru-RU');

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        IonicModule.forRoot(),
        AppRoutingModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        SecureStorage,
        ScreenOrientation,
        ApiService,
        StoreService,
        SecureStorageService,
        {
            provide: RouteReuseStrategy,
            useClass: IonicRouteStrategy
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AppInterceptor,
            multi: true
        },
        {provide: LOCALE_ID, useValue: 'ru-RU'}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
