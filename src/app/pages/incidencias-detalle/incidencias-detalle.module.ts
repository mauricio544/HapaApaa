import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IncidenciasDetallePageRoutingModule } from './incidencias-detalle-routing.module';

import { IncidenciasDetallePage } from './incidencias-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IncidenciasDetallePageRoutingModule
  ],
  declarations: [IncidenciasDetallePage]
})
export class IncidenciasDetallePageModule {}
