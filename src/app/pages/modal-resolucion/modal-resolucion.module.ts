import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalResolucionPageRoutingModule } from './modal-resolucion-routing.module';

import { ModalResolucionPage } from './modal-resolucion.page';
import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from '../gallery/gallery.component';

const routes: Routes = [
  {path: '', component: ModalResolucionPage}
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalResolucionPageRoutingModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalResolucionPage, GalleryComponent],
  exports: [GalleryComponent]
})
export class ModalResolucionPageModule {}
