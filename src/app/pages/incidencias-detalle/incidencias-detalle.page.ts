import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, IonRouterOutlet, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalResolucionPage } from '../modal-resolucion/modal-resolucion.page';
import { ModalCalificacionPage } from '../modal-calificacion/modal-calificacion.page';

@Component({
  selector: 'app-incidencias-detalle',
  templateUrl: './incidencias-detalle.page.html',
  styleUrls: ['./incidencias-detalle.page.scss'],
})
export class IncidenciasDetallePage implements OnInit {
  id:number = 0;
  minutos: number = 0;
  url: string = 'http://hapa.llerenajuarez.online/web/show_incidencias_det_app';
  persona: any = JSON.parse(localStorage.getItem('persona'));
  persona_code: number = this.persona[0].pk;
  persona_hapa: any = this.persona[0].fields.personal_hapa;
  minutos_until: number = 0;
  minutos_rest: number = 0;
  class_warning: "p_warning";
  class_danger: "p_danger";
  texto_warning: string = "";
  texto_danger: string = "Ha excedido el tiempo estimado de solución";
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  detalles: Detalle[] = [];
  calificacion: boolean;
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
        this.calificacion = JSON.parse(data['califica']);        
        const current_time = new Date();
        const detail_time = new Date(this.detalles[0].fields.fecha_cambio_estado);
        const resultado = Math.trunc((current_time.getTime() - detail_time.getTime()) / 1000/60);
        this.minutos_until = resultado;       
        const tiempo_necesario = 10;
        this.minutos_rest = tiempo_necesario - resultado; 
        this.texto_warning = "Tiempo restante para resolver la incidencia: " + this.minutos_rest + " minutos.";
        this.minutos = this.minutos_rest;
      }else{
        alert.present();
        return;
      }
    })
  }

  async modalSoluciones(id, minutos) {
    const modal = await this.modalController.create({
      component: ModalResolucionPage,
      componentProps: {
        id: id,
        minutos: minutos
      },
      cssClass: 'my-custom-class',
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });
    return await modal.present();
  }

  async modalCalificacion(id) {
    const modal = await this.modalController.create({
      component: ModalCalificacionPage,
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