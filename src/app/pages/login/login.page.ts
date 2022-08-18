import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formularioLogin: UntypedFormGroup;
  url = 'http://hapa.llerenajuarez.online/web/login_app';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(public fb: UntypedFormBuilder, public ac: AlertController, public hc: HttpClient, private rt: Router) { 
    this.formularioLogin = this.fb.group({
      "usuario": new UntypedFormControl("", [Validators.required]),
      "contrasenia": new UntypedFormControl("", Validators.required)
    })
  }

  ngOnInit() {
  }

  async login() {
    var f = this.formularioLogin.value;
    if(this.formularioLogin.invalid){
      const alert = await this.ac.create({
        cssClass: 'my-custom-class',
        header: 'Hapa Alerta',
        subHeader: 'Error con datos',
        message: 'Los campos son obligatorios, el usuario es su correo',
        buttons: ['OK']
      });
  
      await alert.present();
      return;
    }

    var user = {
      usuario: f.usuario,
      contrasenia: f.contrasenia 
    }
    
    const alert = await this.ac.create({
      cssClass: 'my-custom-class',
      header: 'Hapa Alerta',
      subHeader: 'Error con usuario/contraseña',
      message: 'Revise su usuario o contraseña',
      buttons: ['OK']
    });

    this.hc.post(this.url, JSON.stringify(user), this.httpOptions).subscribe(data => {
      if(data["status"]){
        //var persona = JSON.parse(data["persona"]);
        //var datos_persona = persona[0].fields;
        localStorage.setItem('usuario', user.usuario);        
        localStorage.setItem('persona', data['persona']);
        localStorage.setItem('first_name', data['first_name']);
        localStorage.setItem('last_name', data['last_name']);
        localStorage.setItem('cliente', data['cliente']);                
        this.rt.navigate(['/dashboard'])
      }else{        
        alert.present();
        return;
      }
    });
  }
}
