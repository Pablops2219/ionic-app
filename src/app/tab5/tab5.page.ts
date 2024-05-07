import { Component, OnInit } from '@angular/core';
import { PromotionsService } from '../services/promotions.service';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
  promotions: any[];

  constructor(private promotionService: PromotionsService) {
    this.promotions = this.promotionService.getPromotions();
   }

  ngOnInit() {
  }

}
