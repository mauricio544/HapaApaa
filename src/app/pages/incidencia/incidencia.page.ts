import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonRouterOutlet } from '@ionic/angular';

@Component({
  selector: 'app-incidencia',
  templateUrl: './incidencia.page.html',
  styleUrls: ['./incidencia.page.scss'],
})
export class IncidenciaPage implements OnInit {
  persona: any = JSON.parse(localStorage.getItem('persona'));
  persona_code: number = this.persona[0].pk;
  persona_hapa: boolean = this.persona[0].personal_hapa
  url: string = 'http://hapa.llerenajuarez.online/web/show_incidencias_app';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  incidencias: Incidencia[] = [];
  async loadIncidencias(){
    var data_persona = {
      code_persona: this.persona_code
    }
    const alert = await this.ac.create({
      cssClass: 'my-custom-class',
      header: 'Hapa Alerta',
      subHeader: 'Sin datos',
      message: 'No existen registros',
      buttons: ['OK']
    });
    this.ht.post(this.url, JSON.stringify(data_persona), this.httpOptions).subscribe(data => {
      if(data["status"]){
        this.incidencias = JSON.parse(data["incidencias"]);
        console.info(this.incidencias);
      }else{
        alert.present();
        return;
      }
    });
  }

  constructor(private io: IonRouterOutlet, private ac: AlertController, private ht: HttpClient, private rt: Router) {
    this.loadIncidencias();
  }

  ngOnInit() {
  }

}

export interface FieldsIncidencia {
  fecha_registro: Date;
  registrada_por: number;
  tipo:string;
}

export interface Incidencia{ 
  model: string;
  pk:number;
  fields: FieldsIncidencia; 
}