import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController} from '@ionic/angular';
import { TodoService } from '../services/todo.service';
import { ToastController } from '@ionic/angular';
import { UsuarioService } from '../services/usuario.service';



@Component({
  selector: 'app-c-subarea',
  templateUrl: './c-subarea.page.html',
  styleUrls: ['./c-subarea.page.scss'],
})
export class CSubareaPage implements OnInit {
  
  @Input() item: any;
  public tagSubArea = ''
  public setorSubArea = ''
  public localSubArea = ''
  public obsSubArea = ''
  public userId = ''
  route: any;
  public edit : boolean
  
  constructor(private  firebase: TodoService, 
              private usuario: UsuarioService,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController,
              public modal: ModalController) {
    this.usuario.getUser().subscribe((user) => this.userId = user.id)
  }

  ngOnInit() {
    if (this.item){
      console.log(this.item.id)
      this.tagSubArea = this.item.tag
      this.setorSubArea = this.item.setor
      this.localSubArea = this.item.local
      this.obsSubArea = this.item.obs
      this.edit = true
    }else{
      this.edit = false
    }
  }

  async adicionarSubArea(){
    if( this.tagSubArea != '' &&
        this.setorSubArea != '' &&
        this.localSubArea != '' &&
        this.obsSubArea != ''){
     if(this.edit == false){
      await this.firebase.db().collection('subareas').add({
        tag: this.tagSubArea,
        setor: this.setorSubArea,
        local: this.localSubArea,
        obs: this.obsSubArea,
        user_id: this.userId,
      })
      console.log()
      
      this.modal.dismiss({})
    }else{
      await this.firebase.db().collection('subareas').doc(this.item.id).update({
        tag: this.tagSubArea,
        setor: this.setorSubArea,
        local: this.localSubArea,
        obs: this.obsSubArea,
        user_id: this.userId,
      })
      this.modal.dismiss({})
    }
    this.tagSubArea = ''
    this.setorSubArea = ''
    this.localSubArea = ''
    this.obsSubArea = ''
  }else{
    const alert = await this.alertCtrl.create({
      message: 'Preencha todos os campos.',
      buttons: ['OK']
    });
    await alert.present();
  }
  }
  
  
  async showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

  close(){
    this.modal.dismiss({})
  }
}
