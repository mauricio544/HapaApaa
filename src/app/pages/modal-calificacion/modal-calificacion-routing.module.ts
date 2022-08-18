import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalCalificacionPage } from './modal-calificacion.page';

const routes: Routes = [
  {
    path: '',
    component: ModalCalificacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalCalificacionPageRoutingModule {}
