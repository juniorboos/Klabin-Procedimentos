import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from './../services/usuario.service'
import { ToastController, IonSlides } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonSlides, {static: true}) slides: IonSlides;

  public email = ''
  public senha = ''
  public checkingUser = true
  public showLoading = false

  constructor(public usuario: UsuarioService, 
              public router: Router,
              public keyboard: Keyboard,
              public toastCtrl: ToastController) {
    this.usuario.getUser().subscribe(user => {
      (user.isOnline)
                    ? this.router.navigateByUrl('/subarea')
                    : this.checkingUser = false
    })
  }

  segmentChanged(event: any) {
    if (event.detail.value === 'login') {
      this.slides.slidePrev();
    } else {
      this.slides.slideNext();
    }
  }

  async logar() {
    try {
      this.showLoading = true
      await this.usuario.login(this.email, this.senha)
      this.showLoading = false
    } catch (erro) {
      this.showLoading = false
      console.log(erro.c)
    }
  }

  async registrar(){
    try {
      this.showLoading = true
      await this.usuario.registrar(this.email, this.senha)
      this.showLoading = false
    } catch (erro) {
      this.showLoading = false
    }

}

showToast(msg) {
  this.toastCtrl.create({
    message: msg,
    duration: 2000
  }).then(toast => toast.present());
}

}


