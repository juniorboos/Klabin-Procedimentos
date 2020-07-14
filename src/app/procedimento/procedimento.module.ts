import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProcedimentoPage } from './procedimento.page';
import { CProcedimentoPage } from '../c-procedimento/c-procedimento.page';
import { MProcedimentoPage } from '../m-procedimento/m-procedimento.page';


const routes: Routes = [
  {
    path: '',
    component: ProcedimentoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProcedimentoPage, CProcedimentoPage, MProcedimentoPage],
  entryComponents: [CProcedimentoPage, MProcedimentoPage]
})
export class ProcedimentoPageModule {}
