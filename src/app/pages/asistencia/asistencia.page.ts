import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonRouterOutlet } from '@ionic/angular';
import { GalleryComponent } from '../gallery/gallery.component';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  persona: any = JSON.parse(localStorage.getItem('persona'));
  persona_code: number = this.persona[0].pk;
  url: string = 'http://hapa.llerenajuarez.online/web/get_operarios';
  url_save: string = 'http://hapa.llerenajuarez.online/web/save_asistencia';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  operarios: Operario[] = [];
  async loadOperarios() {
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
        this.operarios = JSON.parse(data["operarios"]);
        console.info(this.operarios);
      }else{
        alert.present();
        return;
      }
    });
  }

  addPhotoAsistencia() {
    this.ps.addPhoto();
  }

  public closeAlerts() {
    if(this.ac) this.ac.dismiss();
  }

  async showMessage(msg) {
    const alert = await this.ac.create({
      header: 'Hapa Informa',
      subHeader: 'Iniciando registro',
      message: msg
    });

    await alert.present();
  }

  async guardarAsistencias() {    
    this.showMessage('Espere, estamos procesando su registro de asistencias');
    const photoST = await localStorage.getItem('photos');
    this.ps.pics = JSON.parse(photoST) || [];
    for(let o of this.operarios){
      var asistencia = {};
      if (o.fields.hora !== ""){
        asistencia = {
          operario: o.pk,
          grupo: o.fields.grupo,
          tardanza: (o.fields.tardanza ? o.fields.tardanza : false),
          falta: (o.fields.falta ? o.fields.falta : false),
          hora: (o.fields.hora !== "" ? o.fields.hora : ""),
          persona: this.persona_code,
          imagen: this.ps.pics[0].webviewPath,
          nombre_imagen: this.ps.pics[0].filepath
        }
      }else{
        o.fields.hora = "";
        asistencia = {
          operario: o.pk,
          grupo: o.fields.grupo,
          tardanza: (o.fields.tardanza ? o.fields.tardanza : false),
          falta: (o.fields.falta ? o.fields.falta : false),
          hora: "",
          persona: this.persona_code,
          imagen: this.ps.pics[0].webviewPath,
          nombre_imagen: this.ps.pics[0].filepath
        }
      }
      
      this.ht.post(this.url_save, JSON.stringify(asistencia), this.httpOptions).subscribe(data => {
        if(data["status"]){
          //var persona = JSON.parse(data["persona"]);
          //var datos_persona = persona[0].fields;
          this.closeAlerts();
          this.rt.navigate(['/dashboard'])
        }else{        
          this.showMessage('¡Se ha registrado un error al momento de crear su usuario!')
          return;
        }
      });
    }
  }
  constructor(private io: IonRouterOutlet, private ac: AlertController, private ht: HttpClient, private rt: Router, public ps: GalleryComponent) { }

  ngOnInit() {
    this.loadOperarios();
    console.info(this.operarios);
  }

}

export interface FieldsOperario {
  persona: string;
  grupo: number;
  activo: boolean;
  es_super: boolean;  
  tardanza: boolean;
  falta: boolean;
  hora: string;
}

export interface Operario{ 
  model: string;
  pk:number;
  fields: FieldsOperario; 
}
