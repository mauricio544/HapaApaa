import { Component } from '@angular/core';
import { defineCustomElements } from '@ionic/pwa-elements/loader'
import { PushHapaAlertsComponent } from './pages/push-hapa-alerts/push-hapa-alerts.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private hn: PushHapaAlertsComponent) {
    defineCustomElements(window);
    this.init();
  }

  init() {
    this.hn.initPush();
  }
}
