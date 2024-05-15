import { Component, OnInit, inject } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Vehicle } from 'src/app/models/vehicle.module';
import { ComunityService } from 'src/app/services/community/comunity.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-community-events',
  templateUrl: './community-events.component.html',
  styleUrls: ['./community-events.component.scss'],
})
export class CommunityEventsComponent  implements OnInit {


  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  loading: boolean = false;

  vehicles: Vehicle[] = [];
  participants: Vehicle[] = [];
  
  constructor(
    public comunityService: ComunityService,
  ) { }

  ngOnInit(

  ) {}

  user(): User{
    return this.utilsSvc.getFromLocalStorage('user');
  }

  ionViewWillEnter() {
    this.getVehicles(); 
  }

  getVehicles(){
    let path = `users/${this.user().uid}/vehicles`
    this.loading = true;
    let sub = this.firebaseSvc.getCollectionData(path).subscribe({
      next: (res : any) => {
        console.log(res);
        this.vehicles = res;
        this.loading = false;
        sub.unsubscribe();
      }
    })
  }

  async partipateWithVehicle(){

    let success = await this.utilsSvc.presentModal({
      component: CommunityEventsComponent,
      cssClass: 'add-update-modal',
    })
  }

  dismissModal(){
    this.utilsSvc.dismissModal();
  }


  participate(vehicle: Vehicle) {
    this.participants.push(vehicle);
    console.log(this.participants.length)

    this.utilsSvc.presentToast({
      message: 'Estás participando, buena suerte', 
      duration: 2500,
      color: 'success',
      position: 'middle',
      icon: 'checkmark-outline'
    })
    this.comunityService.participation = true;
  }

  async presentAlertConfirm(vehicle: Vehicle) {
    this.utilsSvc.presentAlert({
      header: 'Deseas participar con este vehículo?',
      message: 'Tan solo puedes participar con un vehículo, elige el vehículo con el que te presentarás al evento',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancelar',
        }, {
          text: 'Confirmar',
          handler: () => {
            this.participate(vehicle);
          }
        }
      ]
    });
  }

}
