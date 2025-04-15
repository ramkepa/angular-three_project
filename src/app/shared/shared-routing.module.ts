import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { ThreeDSceneComponent } from './three-d-scene/three-d-scene.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, 
  { path: 'home', component: HomeComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'threed', component: ThreeDSceneComponent }
];

@NgModule({
  declarations: [],
   imports: [
   [RouterModule.forRoot(routes)],
   CommonModule
   ],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
