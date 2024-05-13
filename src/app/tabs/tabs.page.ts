import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';

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
