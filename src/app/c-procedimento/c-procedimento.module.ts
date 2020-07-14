import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CProcedimentoPage } from './c-procedimento.page';

const routes: Routes = [
  {
    path: '',
    component: CProcedimentoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CProcedimentoPage]
})
export class CProcedimentoPageModule {}
