import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { GroupmeComponent } from './groupme.component';

const routes: Routes = [
  {
    path:'', component: GroupmeComponent
  },
  {
    path:'**', component: GroupmeComponent
  }
]

@NgModule({
  declarations: [GroupmeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class GroupmeModule { }
