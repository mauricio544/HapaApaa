import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalResolucionPage } from './modal-resolucion.page';

const routes: Routes = [
  {
    path: '',
    component: ModalResolucionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalResolucionPageRoutingModule {}
