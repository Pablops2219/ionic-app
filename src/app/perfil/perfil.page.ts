import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, LoadingController, ModalController, Platform } from '@ionic/angular';
import { Location } from '@angular/common';
import { BarcodeScanner, LensFacing } from '@capacitor-mlkit/barcode-scanning';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { UserService} from '../services/user.service';

import html2canvas from 'html2canvas';
import { Share } from '@capacitor/share';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  color="secondary"
  options: any[] = [];
  users: any[] = [];
  firebaseSvc = inject (FirebaseService);
  utilsSvc = inject (UtilsService);


  constructor(
    private loadingController: LoadingController,
    private platform: Platform,
    private modalController: ModalController,
    private location: Location,
    private userService: UserService
  ) {
    
  }

  
  
  segment = 'scan';
  qrText = 'test';
  scanResult = '';


  ngOnInit() {

    this.users = this.userService.getUsers();

    if(this.platform.is('capacitor')){
      BarcodeScanner.isSupported().then();
      BarcodeScanner.checkPermissions().then();
      BarcodeScanner.removeAllListeners();
    }

    console.log('profile ngoninit');
    this.options = [
      {title: 'Vehiculos', icon: 'car-outline', color: 'primary', click: "(click)=singOut()"},
      {title: 'Chat', icon: 'chatbubbles-outline', color: 'primary', click: "(click)=singOut()"},
      {title: 'Wishlist', icon: 'heart-outline', color: 'primary', click: "(click)=singOut()"},
      {title: 'Settings', icon: 'options-outline', color: 'primary', click:"(click)=singOut()"},
      {title: 'Notifications', icon: 'notifications-outline', color: 'primary',click: "(click)=singOut()"},
      {title: 'Logout', icon: 'log-out-outline', color: 'secondary', background: 'primary', click: "(click)=singOut()"},
    ];
  }

  // Captura el elemento html lo convierte a un "canvas" y genera una imagen
  captureScreen() {

    const elemento = document.getElementById('qrImage') as HTMLElement;
    html2canvas(elemento).then((canvas: HTMLCanvasElement) => {

      this.downloadImage(canvas);
      if (this.platform.is('capacitor')) this.shareImage(canvas);
      else this.downloadImage(canvas);

    })

  }

  // Descargar la imagen para web
  downloadImage(canvas: HTMLCanvasElement) {
    const link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = 'qr.png';
    link.click();

  }

  // Compartir la imagen para movil
  async shareImage(canvas: HTMLCanvasElement) {

    let base64 = canvas.toDataURL();
    let path = 'qr.png';

    const loading = await this.loadingController.create({
      spinner: 'bubbles'
    });
    await loading.present();

    await Filesystem.writeFile({
      path,
      data: base64,
      directory: Directory.Cache,
    }).then(async (res) => {

      let uri = res.uri;

      await Share.share({
        title: 'See cool stuff',
        text: 'Really awesome thing you need to see right meow',
        url: uri,
        dialogTitle: 'Share with buddies',
      });

      await Filesystem.deleteFile({
        path,
        directory: Directory.Cache
      })
    }).finally(() => { loading.dismiss(); })
  }

  getRows() {
    const rows = [];
    for (let i = 0; i < this.options.length; i += 3) {
      rows.push(this.options.slice(i, i + 3));
    }
    return rows;
  }


  singOut(){
    this.firebaseSvc.singOut();
  }
  
  

}