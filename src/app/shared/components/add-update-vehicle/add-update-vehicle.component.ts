import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';

import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-add-update-vehicle',
  templateUrl: './add-update-vehicle.component.html',
  styleUrls: ['./add-update-vehicle.component.scss'],
})
export class AddUpdateVehicleComponent  implements OnInit {

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
    utilsSvc = inject(UtilsService)
  
    ngOnInit() {
    }
  
    async submit(){
      if(this.form.valid){
  
        const loading = await this.utilsSvc.loading();
        await loading.present();
  
        this.firebaseSvc.signUp(this.form.value as unknown as User).then( async res => {

          await this.firebaseSvc.updateUser(this.form.value.make)
          let uid = res.user.uid;
          this.form.controls.uid.setValue(uid);

        }).catch(error => {

          console.log(error);
          this.utilsSvc.presentToast({message: error.message, duration: 2500, color: 'tertiary', position:'middle', icon:'alert-circle-outline'})

        }).finally(()=> {

          loading.dismiss();

        }) 
  
        
      }
    }


  dismissModal(){
    this.utilsSvc.dismissModal();
  }
}
