import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { Ng2SearchPipeModule } from 'ng2-search-filter'; 
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { IonicSelectableModule } from 'ionic-selectable';
import { AutoCompleteModule } from 'ionic4-auto-complete';
import { NgSelectModule } from '@ng-select/ng-select';
import * as $ from "jquery";
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,FormsModule,ReactiveFormsModule,HttpClientModule,
    IonicModule.forRoot(),AutoCompleteModule,
    AppRoutingModule,Ng2SearchPipeModule,IonicSelectableModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),NgSelectModule //,FileOpener
    ,NgIdleKeepaliveModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,{ provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },InAppBrowser,File,FileOpener 
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule {}
