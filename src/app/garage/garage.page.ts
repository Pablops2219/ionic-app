import { Component, inject, OnInit } from '@angular/core';
import { UtilsService } from '../services/utils.service';
import { AddUpdateVehicleComponent } from '../shared/components/add-update-vehicle/add-update-vehicle.component';
import { User } from '../models/user.model';
import { FirebaseService } from '../services/firebase.service';
import { Vehicle } from '../models/vehicle.module';

@Component({
  selector: 'app-garage',
  templateUrl: './garage.page.html',
  styleUrls: ['./garage.page.scss'],
})
export class GaragePage implements OnInit {

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  vehicles: Vehicle[] = [];
  
  constructor() { }

  ngOnInit() {
  }

  user(): User{
    return this.utilsSvc.getFromLocalStorage('user');
  }

  ionViewWillEnter() {
    this.getVehicles(); 
  }

  

  //======== Agregar o actualizar vehiculos ========
  addUpdateVehicle(){
    this.utilsSvc.presentModal({
      component: AddUpdateVehicleComponent,
      cssClass: 'add-update-modal'
    })
  }

  //======== Obtener vehiculos ========
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
}
