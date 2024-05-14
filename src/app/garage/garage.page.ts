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
  loading: boolean = false;
  
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

  //======== Obtener vehiculos ========
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


  //======== Confirmar eliminacion ========
  async presentAlertConfirm(vehicle: Vehicle) {
    this.utilsSvc.presentAlert({
      header: 'Eliminar vehiculo',
      message: '¿Deseas eliminar este vehículo?',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancelar',
        }, {
          text: 'Eliminar',
          handler: () => {
            this.deleteVehicle(vehicle);
          }
        }
      ]
    });
  }





  //=======Eliminar Vehiculo ========

  async deleteVehicle(vehicle: Vehicle){

    let path = `users/${this.user().uid}/vehicles/${vehicle.uid}`

    const loading = await this.utilsSvc.loading();
    await loading.present();

    let imagePath = await this.firebaseSvc.getFilePath(vehicle.image);
    await this.firebaseSvc.deleteFile(imagePath);

    this.firebaseSvc.deleteDocument(path).then( async res => {

      this.vehicles = this.vehicles.filter(v => v.uid !== vehicle.uid)

      this.utilsSvc.presentToast({
        message: 'Vehículo eliminado', 
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
