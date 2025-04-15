import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedRoutingModule } from './shared-routing.module';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { ThreeDSceneComponent } from './three-d-scene/three-d-scene.component';



@NgModule({
  declarations: [
    HomeComponent,
    ProductComponent,
    ThreeDSceneComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    BrowserAnimationsModule
  ]
})
export class SharedModule { }
