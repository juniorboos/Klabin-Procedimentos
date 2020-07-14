import { Component, OnInit, Input } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { AlertController, PopoverController, ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { UsuarioService } from '../services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { PopoverComponent } from '../popover/popover.component';
import { CProcedimentoPage } from '../c-procedimento/c-procedimento.page';
import { MProcedimentoPage } from '../m-procedimento/m-procedimento.page';


@Component({
  selector: 'app-procedimento',
  templateUrl: './procedimento.page.html',
  styleUrls: ['./procedimento.page.scss'],
})
export class ProcedimentoPage implements OnInit {

  @Input() item: any;
  subAreaId = ''
  public nomeSubarea = ''
  public tagProcedimento = ''
  public descricaoProcedimento = ''
  public fonteProcedimento = ''
  public localProcedimento = ''
  public obsProcedimento = ''
  public procedimentos = []
  public userId = ''
  public index: number
  public reordenacao: boolean

  constructor(private firebase: TodoService, 
              private usuario: UsuarioService,
              private toastCtrl: ToastController,
              public modal: ModalController,
              private route: ActivatedRoute,
              public alertController: AlertController,
              public popoverController: PopoverController) {
    this.usuario.getUser().subscribe((user) => this.userId = user.id)
  }

  ngOnInit() {
    this.subAreaId = this.route.snapshot.params['id'];
    this.carregarProcedimentos();
    this.nomeSubarea = this.route.snapshot.params['tag']
  }

  async novoProcedimento(item = null){
    const pagina = await this.modal.create({
      component: CProcedimentoPage,
      componentProps: {
        subAreaId: this.subAreaId,
        item: item,
        index: this.procedimentos.length
      }
    });
    await pagina.present();
  }

  async mostrarProcedimento(item = null){
    const pagina = await this.modal.create({
      component: MProcedimentoPage,
      componentProps: {
        subAreaId: this.subAreaId,
        item: item,
        index: this.procedimentos.length
      }
    });
    await pagina.present();
  }

  async presentAlert(item, i) {
    const alert = await this.alertController.create({
      message: 'Deseja excluir este procedimento?',
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
            this.removerProcedimento(item, i);
            this.showToast('Ponto de bloqueio removido');
          }
        }
      ]
    });
    await alert.present();

    
  }

  async removerProcedimento(item, i){
    this.firebase.db().collection('subareas').doc(this.subAreaId).collection('procedimentos').doc(item.id).delete()
    this.procedimentos.splice(i, 1)
    this.atualizarIndex()
  }

  async carregarProcedimentos(){
    console.log("carregando procedimentos...")
    this.firebase.db().collection('subareas').doc(this.subAreaId).collection('procedimentos')
    .orderBy('index', 'asc')
    .onSnapshot(results => {
      this.procedimentos = []
      results.docs.forEach(doc => {
        this.procedimentos.push({ id: doc.id, ... doc.data() })
      })
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


  reorderProcedimentos(ev: any)
  {
    this.procedimentos = ev.detail.complete(this.procedimentos)
    this.atualizarIndex();
  }

  atualizarIndex()
  {
    console.log(this.procedimentos)
    for(let i = 0;i < this.procedimentos.length;i++)
    {
      this.firebase.db().collection('subareas').doc(this.subAreaId).collection('procedimentos').doc(this.procedimentos[i].id).update({
        index: i+1
      })
    }
  }

  reordenar() {
    this.reordenacao = !this.reordenacao
  }

 
}
