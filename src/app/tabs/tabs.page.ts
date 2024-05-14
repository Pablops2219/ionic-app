import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { FirebaseService } from '../services/firebase/firebase.service';
import { UtilsService } from '../services/utils/utils.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  firebaseSvc = inject (FirebaseService);
  utilsSvc = inject (UtilsService);

  
  constructor(private router: Router) {}

  navigateToStreaming() {
    this.router.navigate(['/streaming']);
  }

  navigateToNotificaciones() {
    this.router.navigate(['/notificaciones']);
  }

  navigateToPerfil() {
    this.router.navigate(['/perfil']);
  }

  navigateToEscaner() {
    this.router.navigate(['/home']);
  }

  navigateToGarage() {
    this.router.navigate(['/garage']);
  }

  singOut(){
    this.firebaseSvc.singOut();
  }

}
