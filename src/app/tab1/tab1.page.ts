import { Component, inject} from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../services/event/event.service';
import { User } from '../models/user.model';
import { FirebaseService } from '../services/firebase/firebase.service';
import { UtilsService } from '../services/utils/utils.service';
import jsPDF from 'jspdf';
import { PromotionsService } from '../services/promotions/promotions.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  events: any[] = [];
  users: any[] = [];
  firebaseSvc = inject (FirebaseService);
  utilsSvc = inject (UtilsService);
  promotions: any[];

  constructor(
    public eventService: EventService,
    private router: Router,
    private promotionService: PromotionsService
    
  ) {

    this.promotions = this.promotionService.getPromotions();
  }

  ngOnInit() {
    this.events = this.eventService.getEvents();
  }

  user(): User{
    return this.utilsSvc.getFromLocalStorage('user');
  }

  navigateToStreaming() {
    this.router.navigate(['/streaming']);
  }

  navigateToPerfil() {
    this.router.navigate(['/perfil']);
  }

  navigateToEscaner() {
    this.router.navigate(['/home']);
  }

  captureScreen() {
    
    const doc = new jsPDF();

    var img = new Image()
    img.src = 'assets/ticket-sample.png'
    doc.addImage(img, 'png', 2, 50, 205, 80)//210 es full anchura

    doc.save('entradas.pdf');

  }

  buyPromotion(promotion: any) {
    let user = this.user();

    if (user.coins >= promotion.precio) {
        user.coins -= promotion.precio;
        
        // Actualiza el almacenamiento local
        this.utilsSvc.saveInLocalStorage('user', user);
        

        this.firebaseSvc.updateUserInDatabase(user).then(() => {
            this.utilsSvc.presentToast({
                message: `Promoción adquirida`,
                duration: 2000,
                position: 'middle',
                color: 'success',
                icon: 'checkmark-outline'
            });
            promotion.comprado = true;
        }).catch(error => {
            console.error('Error updating user in database', error);
            this.utilsSvc.presentToast({
                message: `Error al adquirir la promoción. Por favor, inténtalo de nuevo.`,
                duration: 2000,
                position: 'middle',
                color: 'danger',
                icon: 'close-outline'
            });
        });
    } else {
        this.utilsSvc.presentToast({
            message: `No dispones de ${promotion.precio} tokens`,
            duration: 2000,
            position: 'middle',
            color: 'danger',
            icon: 'close-outline'
        });
    }
}

  async presentAlertConfirm(promotion: any) {
    this.utilsSvc.presentAlert({
      header: '¿Quieres adquirir esta promoción?',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancelar',
        }, {
          text: 'Adquirir',
          handler: () => {
            this.buyPromotion(promotion);
          }
        }
      ]
    });
  }

}

