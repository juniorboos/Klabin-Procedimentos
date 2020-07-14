import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule', canActivate: [LoginGuard] },
  { path: 'procedimento', loadChildren: './procedimento/procedimento.module#ProcedimentoPageModule', },
  { path: 'procedimento/:id/:tag', loadChildren: './procedimento/procedimento.module#ProcedimentoPageModule' },
  { path: 'subarea', loadChildren: './subarea/subarea.module#SubareaPageModule', canActivate: [AuthGuard]},
  { path: 'subarea/:id', loadChildren: './subarea/subarea.module#SubareaPageModule' },
  { path: 'c-subarea', loadChildren: './c-subarea/c-subarea.module#CSubareaPageModule' },
  { path: 'c-subarea/:id', loadChildren: './c-subarea/c-subarea.module#CSubareaPageModule' },
  { path: 'c-procedimento', loadChildren: './c-procedimento/c-procedimento.module#CProcedimentoPageModule' },
  { path: 'm-procedimento', loadChildren: './m-procedimento/m-procedimento.module#MProcedimentoPageModule' }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
