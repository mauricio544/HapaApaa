import { Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { PushHapaAlertsComponent } from './pages/push-hapa-alerts/push-hapa-alerts.component';


@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, ReactiveFormsModule],
    providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, GalleryComponent, Camera, PushHapaAlertsComponent],
    bootstrap: [AppComponent]
})
export class AppModule {}
