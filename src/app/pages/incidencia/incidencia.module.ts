import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IncidenciaPageRoutingModule } from './incidencia-routing.module';

import { IncidenciaPage } from './incidencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IncidenciaPageRoutingModule
  ],
  declarations: [IncidenciaPage]
})
export class IncidenciaPageModule {}
