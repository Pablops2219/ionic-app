// event.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  // Supongamos que tienes una lista de eventos
  events = [
    { id: 1, title: 'Volrace Driftmaster', date: '10-05-2024', srcimg: 'https://binn.wpenginepowered.com/wp-content/uploads/2023/06/Volrace-Drift-Circuit-Ricardo-Tormo.jpg', description: 'El mejor Drift aterriza en el Circuit Ricardo Tormo de la mano de Volrace' },
    { id: 2, title: 'Campeonato de España de Superbike ESBK', date: '01-06-2024', srcimg: 'https://binn.wpenginepowered.com/wp-content/uploads/2023/05/ESBK-Foto-RFME-1536x1025.jpg', description: 'Superbike, Supersport y carreras de promoción de jóvenes talentos' },
    // Más eventos...
  ];

  constructor() { }

  getEvents() {
    return this.events;
  }
}
