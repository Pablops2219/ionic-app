import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { Vehicle } from 'src/app/models/vehicle.module';

import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-add-update-vehicle',
  templateUrl: './add-update-vehicle.component.html',
  styleUrls: ['./add-update-vehicle.component.scss'],
})
export class AddUpdateVehicleComponent  implements OnInit {

  @Input() vehicle: Vehicle

  form = new FormGroup({

    uid: new FormControl(''),
    license_plate: new FormControl('',[Validators.required]),
    make: new FormControl('',[Validators.required]),
    year: new FormControl(''),
    model: new FormControl('',[Validators.required]),
    color: new FormControl(''),
    image: new FormControl('',[Validators.required]),
  })
  
    firebaseSvc = inject(FirebaseService);
    utilsSvc = inject(UtilsService);

    user = {} as User;
  
    ngOnInit() {
      this.user = this.utilsSvc.getFromLocalStorage('user');
      if(this.vehicle) this.form.setValue(this.vehicle);
    }
    
    //Hacer o seleccionar foto
    
    async takeImage(){
      const dataUrl = (await this.utilsSvc.takePicture('Imagen del vehiculo')).dataUrl;
      this.form.controls.image.setValue(dataUrl);
    }

    submit(){
      if(this.form.valid){ 

        if(this.vehicle) {
          this.updateVehicle();
        }
        else{
          this.createVehicle();
        } 
      }

    }

    async createVehicle(){

        let path = `users/${this.user.uid}/vehicles`
  
        const loading = await this.utilsSvc.loading();
        await loading.present();

        // Subir imagen y obtener URL
        let dataUrl = this.form.value.image;
        let imagePath = `${this.user.uid}/${Date.now()}`;
        let imageUrl = await this.firebaseSvc.uploadImage(imagePath, dataUrl);
        this.form.controls.image.setValue(imageUrl);

        delete this.form.value.uid
  
        this.firebaseSvc.addDocument(path, this.form.value).then( async res => {

          this.utilsSvc.dismissModal({success: true});

          this.utilsSvc.presentToast({
            message: 'Vehículo añadido', 
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

    async updateVehicle(){

        let path = `users/${this.user.uid}/vehicles/${this.vehicle.uid}`
  
        const loading = await this.utilsSvc.loading();
        await loading.present();

        // Si la imagen cambia , subir la nueva imagen y obtener URL
        if(this.form.value.image !== this.vehicle.image){
          let dataUrl = this.form.value.image;
          let imagePath = await this.firebaseSvc.getFilePath(this.vehicle.image);
          let imageUrl = await this.firebaseSvc.uploadImage(imagePath, dataUrl);
          this.form.controls.image.setValue(imageUrl);
        }
        

        delete this.form.value.uid
  
        this.firebaseSvc.updateDocument(path, this.form.value).then( async res => {

          this.utilsSvc.dismissModal({success: true});

          this.utilsSvc.presentToast({
            message: 'Vehículo actualizado', 
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

    


  dismissModal(){
    this.utilsSvc.dismissModal();
  }
}
