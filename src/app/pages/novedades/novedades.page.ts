import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-novedades',
  templateUrl: './novedades.page.html',
  styleUrls: ['./novedades.page.scss'],
})
export class NovedadesPage implements OnInit {
  persona: any = JSON.parse(localStorage.getItem('persona'));
  persona_code: number = this.persona[0].pk;  
  url: string = 'http://hapa.llerenajuarez.online/web/get_novedad_info';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  novedades: Novedades[] = [];
  async loadNovedades(){
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
        this.novedades = JSON.parse(data["noticias"]);        
        console.info(this.novedades);
      }else{
        alert.present();
        return;
      }
    });
  }
  constructor(private ac: AlertController, private ht: HttpClient, private rt: Router) { 
    this.loadNovedades();
  }

  ngOnInit() {
  }

}

export interface FieldsNovedades {
  titulo: string;
  detalle_noticia: string;
  fecha: string;
}

export interface Novedades {
  model: string;
  pk:number;
  fields: FieldsNovedades;
}
