import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'; 

import { HeaderComponent } from '../../core/header/header.component';
import { LayoutComponent } from '../layout/layout.component';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
// import { MaterialModule } from '../../material.module';

const routes: Routes = [
  { 
    path: '', component: LayoutComponent,
    children: [
      {
        path: '', redirectTo: 'pick', pathMatch: 'full'
      },{
        path: 'pick',
        loadChildren: './pick/pick.module#PickModule',
      },{
        path: 'groupme',
        loadChildren: './groupme/groupme.module#GroupmeModule',
      }
    ]
  },{
    path: '**', redirectTo: '/'
  }
]

@NgModule({
  declarations: [
    HeaderComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AngularFontAwesomeModule,
    // MaterialModules
  ]
})
export class LayoutModule { }
