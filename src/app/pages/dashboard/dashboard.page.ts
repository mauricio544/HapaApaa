import { Component, Injectable, OnInit } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { ModalIncidenciasPage } from '../modal-incidencias/modal-incidencias.page';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})

export class DashboardPage implements OnInit {  
  usuario: String;
  first_name: String;
  last_name: String;
  persona: Object;  
  cliente: String;
  constructor(private routerOutlet: IonRouterOutlet, public modalController: ModalController) {
    this.usuario = localStorage.getItem('usuario');
    this.first_name = localStorage.getItem('first_name');
    this.last_name = localStorage.getItem('last_name');
    this.persona = JSON.parse(localStorage.getItem('persona')); 
    this.cliente = localStorage.getItem('cliente')     
  }

  ngOnInit() {
  }

  async modalIncidencias() {
    const modal = await this.modalController.create({
      component: ModalIncidenciasPage,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });
    return await modal.present();
  }

}
