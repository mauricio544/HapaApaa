import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IncidenciasDetallePage } from './incidencias-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: IncidenciasDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncidenciasDetallePageRoutingModule {}
