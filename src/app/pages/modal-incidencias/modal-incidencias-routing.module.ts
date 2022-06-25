import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalIncidenciasPage } from './modal-incidencias.page';

const routes: Routes = [
  {
    path: '',
    component: ModalIncidenciasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalIncidenciasPageRoutingModule {}
