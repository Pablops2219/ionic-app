import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PromotionsService {
    // Supongamos que tienes una lista de eventos
    promotion = [
      { id: 1, title: '20% próximo evento', srcimg: 'https://binn.wpenginepowered.com/wp-content/uploads/2023/06/Volrace-Drift-Circuit-Ricardo-Tormo.jpg', description: 'Obtén un 20% de descuento aplicable al pvp de tu próximo evento', precio: 700 },
      { id: 2, title: 'Bebida gratuita', srcimg: 'https://binn.wpenginepowered.com/wp-content/uploads/2023/05/ESBK-Foto-RFME-1536x1025.jpg', description: 'Obtén la bebida de tu preferencia totalmente gratis', precio: 100},
      { id: 3, title: '50% camiseta', srcimg: 'https://binn.wpenginepowered.com/wp-content/uploads/2023/05/ESBK-Foto-RFME-1536x1025.jpg', description: 'Obtén un 50% de descuento aplicable al pvp de la compra de cualquiera de nuestras camisetas de Ricardo Tolmo Shop', precio: 500 },

      // Más eventos...
    ];
  
    constructor() { }
  
    getPromotions() {
      return this.promotion;
    }
  }