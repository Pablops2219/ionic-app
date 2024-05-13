import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';

import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.page.html',
  styleUrls: ['./sing-up.page.scss'],
})
export class SingUpPage implements OnInit {

    form = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required]),
    name: new FormControl('',[Validators.required, Validators.minLength(4)]),
    uid: new FormControl(''),
    coins: new FormControl(100),
    last_name: new FormControl(''),
    icon: new FormControl('https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg'),
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

          await this.firebaseSvc.updateUser(this.form.value.name)
          let uid = res.user.uid;
          this.form.controls.uid.setValue(uid);
          this.setUserInfo(uid);

        }).catch(error => {

          console.log(error);
          this.utilsSvc.presentToast({message: error.message, duration: 2500, color: 'tertiary', position:'middle', icon:'alert-circle-outline'})

        }).finally(()=> {

          loading.dismiss();

        }) 
  
        
      }
    }

    async setUserInfo(uid: string){
      if(this.form.valid){
  
        const loading = await this.utilsSvc.loading();
        await loading.present();

        let path = `users/${uid}`
        delete this.form.value.password //Contraseña no almacenada privacidad del usuario
  
        this.firebaseSvc.setDocument(path, this.form.value).then( async res => {
          
          this.utilsSvc.saveInLocalStorage('user', this.form.value);
          this.utilsSvc.routerLink('/tabs/tab1');
          this.utilsSvc.presentToast({message: `¡Enhorabuena, has obtenido 100 coins por registrate!`, duration: 2500, color: 'tertiary', position:'middle', icon:'alert-circle-outline'})
          this.form.reset();

        }).catch(error => {
          console.log(error);
          this.utilsSvc.presentToast({message: error.message, duration: 2500, color: 'tertiary', position:'middle', icon:'alert-circle-outline'})
        }).finally(()=> {
          loading.dismiss();
        }) 
  
        
      }
    }
  
  }
  
