import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalIncidenciasPageRoutingModule } from './modal-incidencias-routing.module';

import { ModalIncidenciasPage } from './modal-incidencias.page';
import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from '../gallery/gallery.component';

const routes: Routes = [
  {path: '', component: ModalIncidenciasPage}
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalIncidenciasPageRoutingModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalIncidenciasPage, GalleryComponent],
  exports: [GalleryComponent]
})
export class ModalIncidenciasPageModule {}
