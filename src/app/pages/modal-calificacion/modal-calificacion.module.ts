import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalCalificacionPageRoutingModule } from './modal-calificacion-routing.module';

import { ModalCalificacionPage } from './modal-calificacion.page';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: ModalCalificacionPage}
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalCalificacionPageRoutingModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalCalificacionPage]
})
export class ModalCalificacionPageModule {}
