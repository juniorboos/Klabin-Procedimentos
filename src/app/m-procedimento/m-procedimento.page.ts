import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TodoService } from '../services/todo.service';
import { ToastController } from '@ionic/angular';
import { UsuarioService } from '../services/usuario.service';
import { Camera } from '@ionic-native/camera/ngx';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-m-procedimento',
  templateUrl: './m-procedimento.page.html',
  styleUrls: ['./m-procedimento.page.scss'],
})
export class MProcedimentoPage implements OnInit {
  @Input() item: any;
  public tagProcedimento = ''
  public descricaoProcedimento = ''
  public fonteProcedimento = ''
  public localProcedimento = ''
  public obsProcedimento = ''
  public userId = '' 
  public url = ''
  public index: any
  public downloadUrl: Observable<string>
  

  
  constructor(private  firebase: TodoService, 
              private usuario: UsuarioService,
              private toastCtrl: ToastController,
              private camera: Camera,
              private storage: AngularFireStorage,
              public modal: ModalController) {
    this.usuario.getUser().subscribe((user) => this.userId = user.id)
  }

  ngOnInit() {
      this.tagProcedimento = this.item.tag
      this.descricaoProcedimento = this.item.descricao
      this.fonteProcedimento = this.item.fonte
      this.localProcedimento = this.item.local
      this.obsProcedimento = this.item.obs
      this.downloadUrl = this.item.downloadUrl
      this.index = this.item.index
      this.uploadPicture()
  }


  uploadPicture(){
    const ref = this.storage.ref(this.tagProcedimento + '.jpg')
    this.downloadUrl = ref.getDownloadURL()
  }
  


  close(){
    this.modal.dismiss({})
  }

}
