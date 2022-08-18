import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { GalleryComponent } from '../gallery/gallery.component';
import { Storage } from '@capacitor/storage';

@Injectable({ providedIn: 'root' })

@Component({
  selector: 'app-modal-resolucion',
  templateUrl: './modal-resolucion.page.html',
  styleUrls: ['./modal-resolucion.page.scss'],
})
export class ModalResolucionPage implements OnInit {
  formularioSoluciones: FormGroup;
  url_solucion: string = 'http://hapa.llerenajuarez.online/web/save_solucion_app';
  id: number;
  minutos: number;
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  constructor(public modalCtrl: ModalController, public fb: FormBuilder, public ac: AlertController, public ht: HttpClient, public rt: Router, public ps: GalleryComponent) { 
    this.formularioSoluciones = this.fb.group({
      imagen: new FormControl(""),
      respuesta: new FormControl("", Validators.required)
    })
  }

  ngOnInit() {
    console.info(this.id, this.minutos);
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

  async guardarSolucion() {
    this.showMessage('Espere, estamos procesando su incidencia');
    var f = this.formularioSoluciones.value;
    if(this.formularioSoluciones.invalid){
      const alert = await this.ac.create({
        cssClass: 'my-custom-class',
        header: 'Hapa Alerta',
        subHeader: 'Error con datos',
        message: 'Los campos son obligatorios, debe de ingresar una respuesta y cargar una fotografía',
        buttons: ['OK']
      });
  
      await alert.present();
      return;
    }
    //const photoST = await Storage.get({ key: this.ps.PHOTO_STORAGE});
    const photoST = await localStorage.getItem('photos');
    this.ps.pics = JSON.parse(photoST) || [];
    const persona = JSON.parse(localStorage.getItem('persona')); 
    var solucion = {
      imagen: this.ps.pics[0].webviewPath,
      respuesta: f.respuesta,
      code_persona: persona[0].pk,
      nombre_imagen: this.ps.pics[0].filepath,
      incidencia: this.id,
      minutos: this.minutos
    }

    console.info(solucion);

    const alert = await this.ac.create({
      cssClass: 'my-custom-class',
      header: 'Hapa Informa',
      subHeader: 'Solución registrada',
      message: 'El registro se ha realizado con éxito',
      buttons: ['OK']
    });

    const alert_no = await this.ac.create({
      cssClass: 'my-custom-class',
      header: 'Hapa Alerta',
      subHeader: 'Solución no registrada',
      message: 'Ha habido un problema, puede volver a intentarlo o puede comunicarse con el administrador',
      buttons: ['OK']
    });          

    this.ht.post(this.url_solucion, JSON.stringify(solucion), this.httpOptions).subscribe(data => {            
      if(data["status"]){ 
        this.closeAlerts();       
        alert.present();
        this.dismiss();   
        this.rt.navigate(['/dashboard'])     
      }else{        
        alert_no.present();
        return;
      }
    });

  }

}
