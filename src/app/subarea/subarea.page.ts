import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { ModalController, AlertController, PopoverController, ToastController } from '@ionic/angular';
import { CSubareaPage } from '../c-subarea/c-subarea.page';
import { UsuarioService } from '../services/usuario.service';
import { PopoverComponent } from '../popover/popover.component';


@Component({
  selector: 'app-subarea',
  templateUrl: './subarea.page.html',
  styleUrls: ['./subarea.page.scss'],
})
export class SubareaPage implements OnInit {
  currentImage: any;
  subAreaId = ''
  public subAreas = []
  public allSubAreas: any
  public userId = ''
  route: any;
  public goalList: any[]
  public loadedGoalList: any[]
  public val
  public searchOpt = "searchTag"

  constructor(private firebase: TodoService,
              private usuario: UsuarioService,
              public modal: ModalController,
              private toastCtrl: ToastController,
              public alertController: AlertController,
              public popoverController: PopoverController) {
    this.usuario.getUser().subscribe((user) => this.userId = user.id)
  }

  ngOnInit() {
    this.carregarSubAreas()
  }

  async novaSubArea(item = null){
    const pagina = await this.modal.create({
      component: CSubareaPage,
      componentProps: { item : item }
    })
    await pagina.present()
  }

  async presentAlert(item) {
    const alert = await this.alertController.create({
      message: 'Deseja excluir esta subárea? Todos os dados relacionados a ela serão excluídos.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Sim',
          handler: () => {
            console.log('Confirm Ok');
            this.removerSubArea(item);
            this.showToast('Maquina deletada');
          }
        }
      ]
    });

    await alert.present();
  }

  async removerSubArea(item){
    await this.firebase.db().collection('subareas').doc(item.id).delete()
  }


  async carregarSubAreas(){
    this.firebase.db().collection('subareas')
    .orderBy('local', 'asc')
    .onSnapshot(results => {
      this.subAreas = []
      results.docs.forEach(doc => {
        this.subAreas.push({ id: doc.id, ... doc.data() })
      })
      this.allSubAreas = this.subAreas
    })
  }

  async presentPopover(ev: any){
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      translucent: true,
      cssClass: 'pop-over-style'
    })
    return await popover.present()
  }

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

  limparBusca(){
    this.val = ''
    this.filterList()
  }


  filterList(ev: any = null) {
    this.val = ev !== null ?  ev.target.value : '';

    if (this.val && this.val.trim() != '') {
      this.subAreas = this.allSubAreas
      if (this.searchOpt == 'searchLocal') {
        this.subAreas = this.subAreas.filter((item) => {
          return (item.local.toLowerCase().indexOf(this.val.toLowerCase()) > -1);
        })
      }
      if (this.searchOpt == 'searchTag') {
        this.subAreas = this.subAreas.filter((item) => {
          return (item.tag.toLowerCase().indexOf(this.val.toLowerCase()) > -1);
        })
      }
    } else {
      this.subAreas = this.allSubAreas;
    }
  }


}


