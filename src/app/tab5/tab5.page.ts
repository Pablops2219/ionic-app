import { Component, OnInit, inject} from '@angular/core';
import { User } from '../models/user.model';
import { FirebaseService } from '../services/firebase/firebase.service';
import { PromotionsService } from '../services/promotions/promotions.service';
import { UtilsService } from '../services/utils/utils.service';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
  promotions: any[];
  firebaseSvc = inject (FirebaseService);
  utilsSvc = inject (UtilsService);

  constructor(private promotionService: PromotionsService) {
    this.promotions = this.promotionService.getPromotions();
   }

  user(): User{
    return this.utilsSvc.getFromLocalStorage('user');
  }

  ngOnInit() {
  }

  buyPromotion(promotion : any){
    let user = this.user();

    if(user.coins >= promotion.precio){
      user.coins -= promotion.precio;
      this.utilsSvc.saveInLocalStorage('user', user);
      this.utilsSvc.presentToast({message: `Promocicón adquirida`, duration: 2000,  position:'middle', color: 'success', icon:'checkmark-outline'})
      promotion.comprado = true;
    }else{
      this.utilsSvc.presentToast({message: `No dispones de ${promotion.precio} tokens`, duration: 2000,  position:'middle', color: 'danger', icon:'close-outline'})
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
