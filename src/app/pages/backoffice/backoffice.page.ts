import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonRouterOutlet } from '@ionic/angular';

@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.page.html',
  styleUrls: ['./backoffice.page.scss'],
})
export class BackofficePage implements OnInit {
  persona: any = JSON.parse(localStorage.getItem('persona'));
  persona_code: number = this.persona[0].pk;
  url: string = 'http://hapa.llerenajuarez.online/web/get_backoffice_info';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  backoffice: Backoffice[] = [];
  async loadBackoffice() {
    var data_persona = {
      persona: this.persona_code
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
        this.backoffice = JSON.parse(data["backoffice"]);
        console.info(this.backoffice);
      }else{
        alert.present();
        return;
      }
    });
  }
  constructor(private io: IonRouterOutlet, private ac: AlertController, private ht: HttpClient, private rt: Router) { 
    
  }

  ngOnInit() {
    this.loadBackoffice();
  }

}

export interface FieldsBackoffice {
  persona: number;
  cargo: string;
  telefono_empresa: string;
  email_empresa: string;
  email_adicional: string;
  importancia: number;
}

export interface Backoffice{ 
  model: string;
  pk:number;
  fields: FieldsBackoffice; 
}