import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, LoadingController, ModalController, Platform } from '@ionic/angular';
import { Location } from '@angular/common';
import { BarcodeScanner, LensFacing } from '@capacitor-mlkit/barcode-scanning';
import { Directory, Filesystem } from '@capacitor/filesystem';


import html2canvas from 'html2canvas';
import { Share } from '@capacitor/share';
import { FirebaseService } from '../services/firebase/firebase.service';
import { UtilsService } from '../services/utils/utils.service';
import { User } from '../models/user.model';
import { Vehicle } from '../models/vehicle.module';
import { AchievementsService } from '../services/archievements/achievements.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  color="secondary"
  options: any[] = [];
  firebaseSvc = inject (FirebaseService);
  utilsSvc = inject (UtilsService);
  vehicles: Vehicle[] = [];
  achievements: any[];


  constructor(
    private loadingController: LoadingController,
    private platform: Platform,
    private modalController: ModalController,
    private location: Location,
    private achievementsService: AchievementsService,
  ) {
    this.achievements = this.achievementsService.getAchievement();
  }

  
  
  segment = 'scan';
  qrText = 'test';
  scanResult = '';


  ngOnInit() {
    if(this.platform.is('capacitor')){
      BarcodeScanner.isSupported().then();
      BarcodeScanner.checkPermissions().then();
      BarcodeScanner.removeAllListeners();
    }
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
  
  user(): User{
    return this.utilsSvc.getFromLocalStorage('user');
  }
  
  getVehicles(){
    let path = `users/${this.user().uid}/vehicles`
    let sub = this.firebaseSvc.getCollectionData(path).subscribe({
      next: (res : any) => {
        console.log(res);
        this.vehicles = res; 
        sub.unsubscribe();
      }
    })
  }

  ionViewWillEnter() {
    this.getVehicles(); 
  }

  //Hacer o seleccionar foto   
  async takeImage(){

    let user = this.user();

    let path = `users/${user.uid}`
  
    

    const dataUrl =  (await this.utilsSvc.takePicture('Imagen de usuario')).dataUrl;

    const loading = await this.utilsSvc.loading();
    await loading.present();

    let imagePath = `${user.uid}/profile`;
    user.icon = await this.firebaseSvc.uploadImage(imagePath, dataUrl);

    this.firebaseSvc.updateDocument(path, {icon: user.icon}).then( async res => {

      this.utilsSvc.saveInLocalStorage('user', user);

      this.utilsSvc.presentToast({
        message: 'Imagen actualizada', 
        duration: 1500,
        color: 'success',
        position: 'middle',
        icon: 'checkmark-outline'
      })

    }).catch(error => {

      console.log(error);
      this.utilsSvc.presentToast({message: error.message, duration: 2500, color: 'tertiary', position:'middle', icon:'alert-circle-outline'})

    }).finally(()=> {

      loading.dismiss();

    }) 


  }
  

}