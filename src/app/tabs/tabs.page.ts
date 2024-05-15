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

  user(): User{
    return this.utilsSvc.getFromLocalStorage('user');
  }
 
  openYouTube() {
    const youtubeChannelUrl = 'https://www.youtube.com/@CircuitRicardoTormo';
    const encodedUrl = encodeURIComponent(youtubeChannelUrl);
    window.open(encodedUrl, '_blank');
  }
  
  openTwitter() {
    const youtubeChannelUrl = 'https://twitter.com/circuitvalencia?lang=es';
    const encodedUrl = encodeURIComponent(youtubeChannelUrl);
    window.open(encodedUrl, '_blank');
  }

  openFacebook() {
    const youtubeChannelUrl = 'https://www.facebook.com/CircuitRicardoTormoOficial/?locale=es_ES';
    const encodedUrl = encodeURIComponent(youtubeChannelUrl);
    window.open(encodedUrl, '_blank');
  }

  openTikTok() {
    const youtubeChannelUrl = 'https://www.tiktok.com/@circuitricardotormo';
    const encodedUrl = encodeURIComponent(youtubeChannelUrl);
    window.open(encodedUrl, '_blank');
  }

  openInstagram(){
    const youtubeChannelUrl = 'https://www.instagram.com/circuitvalencia/?hl=es';
    const encodedUrl = encodeURIComponent(youtubeChannelUrl);
    window.open(encodedUrl, '_blank');
  }

  

}
