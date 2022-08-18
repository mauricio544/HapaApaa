import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { GalleryComponent } from '../gallery/gallery.component';
import { Storage } from '@capacitor/storage';

@Injectable({ providedIn: 'root' })

@Component({
  selector: 'app-modal-incidencias',
  templateUrl: './modal-incidencias.page.html',
  styleUrls: ['./modal-incidencias.page.scss'],
})
export class ModalIncidenciasPage implements OnInit {
  formularioIncidencias: FormGroup;
  url_incidencia: string = 'http://hapa.llerenajuarez.online/web/save_incidencia_app';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  constructor(public modalCtrl: ModalController, public fb: FormBuilder, public ac: AlertController, public ht: HttpClient, public rt: Router, public ps: GalleryComponent) { 
    this.formularioIncidencias = this.fb.group({
      imagen: new FormControl(""),
      preguntas: new FormControl("", Validators.required)
    })
  }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  addPhoto() {
    this.ps.addPhoto();
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

  async guardarIncidencia() {
    this.showMessage('Espere, estamos procesando su incidencia');
    var f = this.formularioIncidencias.value;
    if(this.formularioIncidencias.invalid){
      const alert = await this.ac.create({
        cssClass: 'my-custom-class',
        header: 'Hapa Alerta',
        subHeader: 'Error con datos',
        message: 'Los campos son obligatorios, debe de seleccionar una observación y cargar una fotografía',
        buttons: ['OK']
      });
  
      await alert.present();
      return;
    }
    //const photoST = await Storage.get({ key: this.ps.PHOTO_STORAGE});
    const photoST = await localStorage.getItem('photos');
    this.ps.pics = JSON.parse(photoST) || [];
    const persona = JSON.parse(localStorage.getItem('persona')); 
    var incidencia = {
      imagen: this.ps.pics[0].webviewPath,
      tipo: f.preguntas,
      code_persona: persona[0].pk,
      nombre_imagen: this.ps.pics[0].filepath
    }

    console.info(incidencia);

    const alert = await this.ac.create({
      cssClass: 'my-custom-class',
      header: 'Hapa Informa',
      subHeader: 'Incidencia registrada',
      message: 'El registro se ha realizado con éxito',
      buttons: ['OK']
    });

    const alert_no = await this.ac.create({
      cssClass: 'my-custom-class',
      header: 'Hapa Alerta',
      subHeader: 'Incidencia no registrada',
      message: 'Ha habido un problema, puede volver a intentarlo o puede comunicarse con el administrador',
      buttons: ['OK']
    });          

    this.ht.post(this.url_incidencia, JSON.stringify(incidencia), this.httpOptions).subscribe(data => {            
      if(data["status"]){ 
        this.closeAlerts();       
        alert.present();
        this.dismiss();    
        this.rt.url    
      }else{        
        alert_no.present();
        return;
      }
    });

  }
}
