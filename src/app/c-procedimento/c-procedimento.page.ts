import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { TodoService } from '../services/todo.service';
import { ToastController } from '@ionic/angular';
import { UsuarioService } from '../services/usuario.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators'
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-c-procedimento',
  templateUrl: './c-procedimento.page.html',
  styleUrls: ['./c-procedimento.page.scss'],
})
export class CProcedimentoPage implements OnInit {
  currentImage: any;
  @Input() subAreaId: any;
  @Input() item: any;
  @Input() index: any;

  public coordenadas = { latitude: 0, longitude: 0 };
  private flagCamera: boolean
  private numero: number
  public tagProcedimento = ''
  public descricaoProcedimento = ''
  public fonteProcedimento = ''
  public localProcedimento = ''
  public obsProcedimento = ''
  public userId = ''
  route: any;
  public edit : boolean
  public uploadPercent: Observable<number>
  public downloadUrl: Observable<string>
  public nomeProcedimento1: ''
  
  
  
  constructor(private  firebase: TodoService, 
              private usuario: UsuarioService,
              private toastCtrl: ToastController,
              private camera: Camera,
              public modal: ModalController,
              private alertCtrl: AlertController,
              private file: File,
              public geolocation: Geolocation,
              private storage: AngularFireStorage ) {
    this.usuario.getUser().subscribe((user) => this.userId = user.id)
    this.getCoordenadas();
  }

  getCoordenadas() {
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      console.log(resp.coords.latitude)
      console.log(resp.coords.longitude)
      this.coordenadas.latitude = resp.coords.latitude
      this.coordenadas.longitude = resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  ngOnInit() {
    if (this.item){
      console.log(this.item.id)
      this.tagProcedimento = this.item.tag
      this.descricaoProcedimento = this.item.descricao
      this.fonteProcedimento = this.item.fonte
      this.localProcedimento = this.item.local
      this.obsProcedimento = this.item.obs
      this.coordenadas.latitude = this.item.latitude,
      this.coordenadas.longitude = this.item.longitude,
      this.edit = true
      this.flagCamera = true
    }else{ 
      this.edit = false
      this.flagCamera = false
    }
  }


  async adicionarProcedimento(){
    if (this.coordenadas.latitude == 0) {
      this.getCoordenadas();
    }
    console.log(this.flagCamera)
    if( this.flagCamera == true && 
        this.tagProcedimento != '' &&
        this.descricaoProcedimento != '' &&
        this.fonteProcedimento != '' &&
        this.localProcedimento != '' &&
        this.obsProcedimento != ''){
      if(this.edit == false) {
        await this.firebase.db().collection('subareas').doc(this.subAreaId).collection('procedimentos').add({
          tag: this.tagProcedimento,
          descricao: this.descricaoProcedimento,
          fonte: this.fonteProcedimento,
          local: this.localProcedimento,
          obs: this.obsProcedimento,
          latitude: this.coordenadas.latitude,
          longitude: this.coordenadas.longitude,
          user_id: this.userId,
          index: this.index + 1,
        })
        this.tagProcedimento = ''
        this.descricaoProcedimento = ''
        this.fonteProcedimento = ''
        this.localProcedimento = ''
        this.obsProcedimento = ''
        this.modal.dismiss({})
        }else{
          this.firebase.db().collection('subareas').doc(this.subAreaId).collection('procedimentos').doc(this.item.id).update({
            tag: this.tagProcedimento,
            descricao: this.descricaoProcedimento,
            fonte: this.fonteProcedimento,
            local: this.localProcedimento,
            obs: this.obsProcedimento,
            latitude: this.coordenadas.latitude,
            longitude: this.coordenadas.longitude,
            user_id: this.userId,
          })
          this.modal.dismiss({})
        }
    }else{
      const alert = await this.alertCtrl.create({
        message: 'Preencha todos os campos e tire uma foto.',
        buttons: ['OK']
      });
      await alert.present();
    }
}

  close(){
    this.modal.dismiss({})
  }

  async beforeTakePicture() {
    if(this.tagProcedimento != '')
    {
      this.takePicture()
    }else{
      const alert = await this.alertCtrl.create({
        message: 'Antes de tirar a foto, preencha o campo Tag.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
  

  async takePicture() {
    const options: CameraOptions = {
      quality: 80,      
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA,
      correctOrientation: true
    };

    try {
      const fileUri: string = await this.camera.getPicture(options)
      console.log(fileUri)
      let file: string
      file = fileUri.split('/').pop()
      //file = fileUri.substring(fileUri.lastIndexOf('/') + 1, fileUri.indexOf('?'))
      console.log(file)
      const path: string = fileUri.substring(0, fileUri.lastIndexOf('/'))
      console.log(path)

      const buffer: ArrayBuffer = await this.file.readAsArrayBuffer(path,file)
      const blob: Blob = new Blob([buffer], { type: 'image/jpeg' })

      this.uploadPicture(blob)
      this.flagCamera = true
    } catch (error) {
      console.error(error)
    }

  }

  uploadPicture(blob: Blob){
    const ref = this.storage.ref(this.tagProcedimento + '.jpg')
    const task = ref.put(blob)

    this.uploadPercent = task.percentageChanges()
    task.snapshotChanges().pipe( 
      finalize(() => this.downloadUrl = ref.getDownloadURL())
    ).subscribe()

  }
}
