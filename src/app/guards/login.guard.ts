import { UsuarioService } from './../services/usuario.service'
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TodoService } from '../services/todo.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(public usuario: UsuarioService,
    private authService: TodoService,
    public router: Router, ) { }


  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      this.authService.auth().onAuthStateChanged(user => {
        if (user) this.router.navigate(['subarea'])

        resolve(!user ? true : false)
      })
    })
  }

}