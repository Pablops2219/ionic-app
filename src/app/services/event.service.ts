// event.service.ts

import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class EventService {
  // Supongamos que tienes una lista de eventos
  events = [
    { id: 1, title: 'Volrace Driftmaster', date: '2024-05-07', srcimg: 'https://binn.wpenginepowered.com/wp-content/uploads/2023/06/Volrace-Drift-Circuit-Ricardo-Tormo.jpg', description: 'El mejor Drift aterriza en el Circuit Ricardo Tormo de la mano de Volrace'},
    { id: 2, title: 'Campeonato de España de Superbike ESBK', date: '2024-06-01', srcimg: 'https://binn.wpenginepowered.com/wp-content/uploads/2023/05/ESBK-Foto-RFME-1536x1025.jpg', description: 'Superbike, Supersport y carreras de promoción de jóvenes talentos'},
    { id: 3, title: 'Campeonato de España de Superbike ESBK', date: '2024-06-01', srcimg: 'https://binn.wpenginepowered.com/wp-content/uploads/2023/05/ESBK-Foto-RFME-1536x1025.jpg', description: 'Superbike, Supersport y carreras de promoción de jóvenes talentos'},
    { id: 4, title: 'Campeonato de España de Superbike ESBK', date: '2024-06-01', srcimg: 'https://binn.wpenginepowered.com/wp-content/uploads/2023/05/ESBK-Foto-RFME-1536x1025.jpg', description: 'Superbike, Supersport y carreras de promoción de jóvenes talentos'},
    { id: 4, title: 'Campeonato de España de Superbike ESBK', date: '2024-06-01', srcimg: 'https://binn.wpenginepowered.com/wp-content/uploads/2023/05/ESBK-Foto-RFME-1536x1025.jpg', description: 'Superbike, Supersport y carreras de promoción de jóvenes talentos'},
    // Más eventos...
  ];
  
  

  constructor(private datePipe: DatePipe) { } // Inyecta DatePipe en el constructor

  getEventsLive() {
    const today = new Date(); // Obtiene la fecha actual
    const pastEvents = this.events.filter(event => {
      const eventDate = new Date(event.date); // Asegúrate de que event.date sea un objeto Date
      return eventDate <= today; // Compara directamente los objetos Date
    });
    return pastEvents;
  }

  getEvents() {
    const today = new Date(); // Obtiene la fecha actual
    const pastEvents = this.events.filter(event => {
      const eventDate = new Date(event.date); // Asegúrate de que event.date sea un objeto Date
      return eventDate > today; // Compara directamente los objetos Date
    });
    return pastEvents;
  }
}

