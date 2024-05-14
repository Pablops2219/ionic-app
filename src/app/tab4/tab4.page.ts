import { Component, inject, OnInit, ElementRef ,ViewChild} from '@angular/core';  
import { EventService } from '../services/event/event.service';
import { Router } from '@angular/router';
import { LoadingController, Platform } from '@ionic/angular';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { ComunityService } from '../services/community/comunity.service';
import { FirebaseService } from '../services/firebase/firebase.service';
import { UtilsService } from '../services/utils/utils.service';
import { User } from '../models/user.model';
import { Vehicle } from '../models/vehicle.module';
import { AddUpdateVehicleComponent } from '../shared/components/add-update-vehicle/add-update-vehicle.component';
import { CommunityEventsComponent } from '../shared/components/community-events/community-events.component';




@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page {

  segment= 'eventos';

  vehicles: Vehicle[] = [];


  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  events: any[];
  comunitys: any[];
  
  constructor(
    public eventService: EventService,
    public comunityService: ComunityService,
     private router: Router,
    private loadingController: LoadingController,
    private platform: Platform) {
    this.events = this.eventService.getEvents();
    this.comunitys = this.comunityService.getEvents();
  }

  async addUpdateVehicle(vehicle?: Vehicle){

    let success = await this.utilsSvc.presentModal({
      component: AddUpdateVehicleComponent,
      cssClass: 'add-update-modal',
      componentProps: {vehicle}
    })

    if(success){
      this.getVehicles();
    }
    
  }
  
  user(): User{
    return this.utilsSvc.getFromLocalStorage('user');
  }

  ionViewWillEnter() {
    this.getVehicles(); 
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

  typeEvent(comunity: any) {
    const desiredEventTitle = comunity.title; // Título del evento que quieres verificar
    const desiredSubstring = 'ncuesta'; // Subcadena que deseas encontrar en el título

    const event = this.comunitys.find((e) => e.title === desiredEventTitle);

    if (event.title.includes(desiredSubstring)) {
      // Si se encuentra el evento y el título contiene la subcadena deseada
      console.log(`El evento contiene "${desiredSubstring}"`);

    } else {
      console.log(`El evento no contiene "${desiredSubstring}"`);
      this.partipateWithVehicle();
    }
  }



  async partipateWithVehicle(){

     await this.utilsSvc.presentModal({
      component: CommunityEventsComponent,
      cssClass: 'add-update-modal',
    })
  }

  ngAfterViewInit() {
  }
  
  navigateToStreaming() {
    this.router.navigate(['./tabs/streaming']);
  }

  // Captura el elemento html lo convierte a un "canvas" y genera una imagen
  captureScreen() {
    
    const doc = new jsPDF();

    var img = new Image()
    img.src = 'assets/ticket-sample.png'
    doc.addImage(img, 'png', 2, 50, 205, 80)//210 es full anchura

    doc.save('entradas.pdf');

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

  




}