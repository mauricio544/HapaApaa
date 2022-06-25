import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, IonRouterOutlet, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalResolucionPage } from '../modal-resolucion/modal-resolucion.page';

@Component({
  selector: 'app-incidencias-detalle',
  templateUrl: './incidencias-detalle.page.html',
  styleUrls: ['./incidencias-detalle.page.scss'],
})
export class IncidenciasDetallePage implements OnInit {
  id:number = 0;
  url: string = 'http://hapa.llerenajuarez.online/web/show_incidencias_det_app';
  persona: any = JSON.parse(localStorage.getItem('persona'));
  persona_code: number = this.persona[0].pk;
  persona_hapa: any = this.persona[0].fields.personal_hapa;
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  detalles: Detalle[] = [];
  constructor(public ar: ActivatedRoute, private hc: HttpClient, private ac: AlertController, private rt: Router, private routerOutlet: IonRouterOutlet, public modalController: ModalController) { 
    
  }

  ngOnInit() {    
    this.ar.paramMap.subscribe(params => {      
      this.id = Number(params.get('pk'));      
    });
    this.loadDetalle(this.id);
  }

  async loadDetalle(pk:number) {
    var data_detalle = {
      incidencia_pk: this.id
    }
    const alert = await this.ac.create({
      cssClass: 'my-custom-class',
      header: 'Hapa Alerta',
      subHeader: 'Sin datos',
      message: 'No existen registros',
      buttons: ['OK']
    });

    this.hc.post(this.url, JSON.stringify(data_detalle), this.httpOptions).subscribe(data => {
      if(data['status']){
        this.detalles = JSON.parse(data['detalle']);
      }else{
        alert.present();
        return;
      }
    })
  }

  async modalSoluciones(id) {
    const modal = await this.modalController.create({
      component: ModalResolucionPage,
      componentProps: {
        id: id
      },
      cssClass: 'my-custom-class',
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });
    return await modal.present();
  }

}


export interface FieldsDetalle {
  estado: string;
  fecha_cambio_estado: Date;
  resolucion_por: string;
  image: string,
  incidencia: number;
  rpta_resolucion: string;
}

export interface Detalle{ 
  model: string;
  pk:number;
  fields: FieldsDetalle; 
}