import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IncidenciaPage } from './incidencia.page';

const routes: Routes = [
  {
    path: '',
    component: IncidenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncidenciaPageRoutingModule {}
