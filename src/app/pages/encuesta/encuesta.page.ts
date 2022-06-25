import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { RangeValue } from '@ionic/core';
import { RangeCustomEvent } from '@ionic/core';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.page.html',
  styleUrls: ['./encuesta.page.scss'],
})
export class EncuestaPage implements OnInit {
  persona: any = JSON.parse(localStorage.getItem('persona'));
  persona_code: number = this.persona[0].pk;
  nombre_encuesta: string = "";
  code_encuesta: number = 0;
  url: string = 'http://hapa.llerenajuarez.online/web/get_encuestas_info';
  url_save: string = 'http://hapa.llerenajuarez.online/web/save_encuestas_info';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  preguntas: Preguntas[] = [];
  lastEmittedValue: RangeValue;
  id: RangeValue;
  onIonChange(ev: Event, pk) {
    this.lastEmittedValue = (ev as RangeCustomEvent).detail.value;
    for(let i of this.preguntas){
      if(i.pk === pk)
        i.valor = this.lastEmittedValue; 
    }
  }
  async loadPreguntas(){    
    var person = {
      persona: this.persona_code
    }
    const alert = await this.ac.create({
      cssClass: 'my-custom-class',
      header: 'Hapa Alerta',
      subHeader: 'Sin datos',
      message: 'No existen registros',
      buttons: ['OK']
    });
    this.ht.post(this.url, JSON.stringify(person), this.httpOptions).subscribe(data => {
      if(data["status"]){
        this.preguntas = JSON.parse(data["preguntas"]);
        this.nombre_encuesta = data["encuesta"];
        this.code_encuesta = data["encuesta_code"];
        console.info(this.preguntas);
      }else{
        alert.present();
        return;
      }
    });
  }
  constructor(private ac: AlertController, private ht: HttpClient, private rt: Router) {
    this.loadPreguntas();
  }
  
  public closeAlerts() {
    if(this.ac) this.ac.dismiss();
  }

  async showMessage(msg) {
    const alert = await this.ac.create({
      header: 'Hapa Informa',
      subHeader: 'Iniciando envío',
      message: msg
    });

    await alert.present();
  }

  async fill(){
    this.showMessage('Espere estamos procesando la encuesta');
    var encuesta = {
      persona: this.persona_code,
      encuesta: this.code_encuesta,
      preguntas: this.preguntas
    }
    const alert = await this.ac.create({
      cssClass: 'my-custom-class',
      header: 'Hapa Éxito',
      subHeader: 'Datos guardados',
      message: 'Se ha procesado con éxito la encuesta, agradecemos su tiempo.',
      buttons: ['OK']
    });
    const alert_no = await this.ac.create({
      cssClass: 'my-custom-class',
      header: 'Hapa Alerta',
      subHeader: 'Error',
      message: 'No se pudo procesar la encuesta',
      buttons: ['OK']
    });
    const alert_info = await this.ac.create({
      cssClass: 'my-custom-class',
      header: 'Hapa Alerta',
      subHeader: 'Datos faltantes',
      message: 'Debe de responder y asignar un valor a las preguntas',
      buttons: ['OK']
    });
    console.info(encuesta);
    for(let e of this.preguntas){
      if (!e.valor){
        alert_info.present();
        return false;
      }
    }
    this.ht.post(this.url_save, JSON.stringify(encuesta), this.httpOptions).subscribe(data => {
      if(data["status"]){
        this.closeAlerts();
        alert.present();
      }else{
        alert_no.present();
        return;
      }
    });
  }

  ngOnInit() {
  }

}

export interface FieldsPreguntas {
  pregunta: string;
  min_val: number;
  max_val: number;
}

export interface Preguntas {
  model: string;
  pk:number;
  fields: FieldsPreguntas;
  valor: RangeValue;
}