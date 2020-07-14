import { Component, OnInit, ViewChild } from '@angular/core';
import { PopoverController, AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TodoService } from '../services/todo.service';


@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  @ViewChild('myNav', {static:false}) nav: NavController

  constructor(public popoverController: PopoverController,
              public firebase: TodoService,
              public router: Router,
              public alertController: AlertController,
              public navCtrl: NavController
              ) { }

  ngOnInit() {}


  dismissPopover(){
    this.popoverController.dismiss()
  }

  logout(){
    this.firebase.auth().signOut()
    this.router.navigateByUrl('home')
    this.dismissPopover()
  }

  async presentAlert() {
    this.dismissPopover()
    const alert = await this.alertController.create({
      message: 'Para editar/excluir, deslize o item desejado para a esquerda.',
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          cssClass: 'secondary',
        }
      ]
    });
    await alert.present();
  }

}
