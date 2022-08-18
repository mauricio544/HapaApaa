import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [  
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },  
  {
    path: 'incidencia',
    loadChildren: () => import('./pages/incidencia/incidencia.module').then( m => m.IncidenciaPageModule)
  },
  {
    path: 'novedades',
    loadChildren: () => import('./pages/novedades/novedades.module').then( m => m.NovedadesPageModule)
  },
  {
    path: 'encuesta',
    loadChildren: () => import('./pages/encuesta/encuesta.module').then( m => m.EncuestaPageModule)
  },
  {
    path: 'asistencia',
    loadChildren: () => import('./pages/asistencia/asistencia.module').then( m => m.AsistenciaPageModule)
  },
  {
    path: 'reporte',
    loadChildren: () => import('./pages/reporte/reporte.module').then( m => m.ReportePageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },  
  {
    path: 'modal-incidencias',
    loadChildren: () => import('./pages/modal-incidencias/modal-incidencias.module').then( m => m.ModalIncidenciasPageModule)
  },
  {
    path: 'incidencias-detalle',
    loadChildren: () => import('./pages/incidencias-detalle/incidencias-detalle.module').then( m => m.IncidenciasDetallePageModule)
  },
  {
    path: 'incidencias-detalle/:pk',
    loadChildren: () => import('./pages/incidencias-detalle/incidencias-detalle.module').then( m => m.IncidenciasDetallePageModule)
  },
  {
    path: 'asistencia',
    loadChildren: () => import('./pages/asistencia/asistencia.module').then( m => m.AsistenciaPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'modal-resolucion',
    loadChildren: () => import('./pages/modal-resolucion/modal-resolucion.module').then( m => m.ModalResolucionPageModule)
  },
  {
    path: 'modal-calificacion',
    loadChildren: () => import('./pages/modal-calificacion/modal-calificacion.module').then( m => m.ModalCalificacionPageModule)
  },
  {
    path: 'backoffice',
    loadChildren: () => import('./pages/backoffice/backoffice.module').then( m => m.BackofficePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
