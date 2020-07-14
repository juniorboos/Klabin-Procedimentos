import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SubareaPage } from './subarea.page';
import { CSubareaPage } from '../c-subarea/c-subarea.page';
import { PopoverComponent } from '../popover/popover.component';


const routes: Routes = [
  {
    path: '',
    component: SubareaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SubareaPage, CSubareaPage],
  entryComponents: [CSubareaPage]
})
export class SubareaPageModule {}
