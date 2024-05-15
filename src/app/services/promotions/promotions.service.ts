import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PromotionsService {
    // Supongamos que tienes una lista de eventos
    promotion = [
      { id: 1, 
        title: '20% próximo evento', 
        srcimg: 'https://binn.wpenginepowered.com/wp-content/uploads/2023/05/ESBK-Foto-RFME-1536x1025.jpg', 
        description: 'Obtén un 20% de descuento aplicable al pvp de tu próximo evento', 
        precio: 700,
        comprado: false,
      },
      { id: 2,
        title: 'Bebida gratuita',
         srcimg: 'https://s1.eestatic.com/2020/08/26/actualidad/actualidad_515960552_158522051_1706x960.jpg',
        description: 'Obtén la bebida de tu preferencia totalmente gratis',
        precio: 100,
        comprado: false,
      },
      { id: 3,
        title: '50% camiseta', 
        srcimg: 'https://th.bing.com/th/id/OIP.Zrad0etmuDfBA6LP1EPM6QAAAA?rs=1&pid=ImgDetMain', 
        description: 'Obtén un 50% de descuento aplicable al pvp de la compra de cualquiera de nuestras camisetas de Ricardo Tolmo Shop', 
        precio: 500,
        comprado: false,
      },

      // Más eventos...
    ];
  
    constructor() { }
  
    getPromotions() {
      return this.promotion;
    }
  }