import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';


const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule),
    // canActivate: [AuthGuardService] 
  },
];
@NgModule({
  declarations: [],
  imports: [
  [RouterModule.forRoot(routes)],
  CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
