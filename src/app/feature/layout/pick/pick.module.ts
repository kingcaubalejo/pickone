import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { FileUploadModule } from 'ng2-file-upload';
import { PickComponent } from '../pick/pick.component';

const routes: Routes = [
  {
    path:'', component: PickComponent
  },
  {
    path:'**', component: PickComponent
  }
]

@NgModule({
  declarations: [PickComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FileUploadModule
  ]
})
export class PickModule { }
