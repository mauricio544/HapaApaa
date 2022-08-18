import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-calificacion',
  templateUrl: './modal-calificacion.page.html',
  styleUrls: ['./modal-calificacion.page.scss'],
})
export class ModalCalificacionPage implements OnInit {
  formularioCalificacion: FormGroup;
  url_calificacion: string = "http://hapa.llerenajuarez.online/web/save_calificacion_app";
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  id: number;
  name: string = "star-outline";
  name_fill: string = "star";
  lock_4: boolean = false;
  lock_8: boolean = false;
  lock_12: boolean = false;
  lock_16: boolean = false;
  lock_20: boolean = false;
  lock: boolean = false;
  star_value: number = 0;
  constructor(public modalCtrl: ModalController, public fb: FormBuilder, public ac: AlertController, public ht: HttpClient, public rt: Router) { 
    this.formularioCalificacion = this.fb.group({
      observacion: new FormControl("", Validators.required)      
    });
  }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  public closeAlerts() {
    if(this.ac) this.ac.dismiss();
  }

  async showMessage(msg) {
    const alert = await this.ac.create({
      header: "Hapa Informa",
      subHeader: "Iniciando envío",
      message: msg
    });

    await alert.present();
  }

  public addStar(valor) {
    this.star_value = valor;    
    switch(valor){
      case 4: {
        this.lock_4 = true;  
        this.lock_8 = false;        
        this.lock_12 = false;        
        this.lock_16 = false;
        this.lock_20 = false;   
        break;
      }
      case 8: {
        this.lock_4 = true;        
        this.lock_8 = true;  
        this.lock_12 = false;        
        this.lock_16 = false;
        this.lock_20 = false;         
        break;
      }
      case 12: {
        this.lock_4 = true;        
        this.lock_8 = true;        
        this.lock_12 = true;  
        this.lock_16 = false;
        this.lock_20 = false;       
        break;
      }
      case 16: {
        this.lock_4 = true;        
        this.lock_8 = true;        
        this.lock_12 = true;        
        this.lock_16 = true;        
        this.lock_20 = false;  
        break;
      }
      default: {
        this.lock_4 = true;        
        this.lock_8 = true;        
        this.lock_12 = true;        
        this.lock_16 = true;
        this.lock_20 = true;        
        break;
      }
    }       
  }

  async guardarCalificacion() {
    this.showMessage("Espere, estamos enviando su calificación.");
    var f = this.formularioCalificacion.value;
    if (this.formularioCalificacion.invalid){
      const alert = await this.ac.create({
        cssClass: 'my-custom-class',
        header: 'Hapa Alerta',
        subHeader: 'Error con datos',
        message: 'Los campos son obligatorios, debe de ingresar una observación y seleccionar la cantidad de estrellas.',
        buttons: ['OK']
      });
  
      await alert.present();
      return;
    }
    const persona = JSON.parse(localStorage.getItem('persona')); 
    var calificacion = {
      incidencia: this.id,
      observacion: f.observacion,
      calificacion: this.star_value,
      persona_califica: persona[0].pk
    }
    const alert = await this.ac.create({
      cssClass: 'my-custom-class',
      header: 'Hapa Informa',
      subHeader: 'Calificación registrada',
      message: 'El registro se ha realizado con éxito',
      buttons: ['OK']
    });

    const alert_no = await this.ac.create({
      cssClass: 'my-custom-class',
      header: 'Hapa Alerta',
      subHeader: 'Calificación no registrada',
      message: 'Ha habido un problema, puede volver a intentarlo o puede comunicarse con el administrador',
      buttons: ['OK']
    }); 

    this.ht.post(this.url_calificacion, JSON.stringify(calificacion), this.httpOptions).subscribe(data => {            
      if(data["status"]){ 
        this.closeAlerts();       
        alert.present();
        this.dismiss();   
        this.rt.navigate(['/incidencia'])     
      }else{        
        alert_no.present();
        return;
      }
    });
  }

}
