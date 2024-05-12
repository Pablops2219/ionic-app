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
    
      {
          id: 3,
          title: "Gran Premio de España de MotoGP",
          date: "2024-06-15",
          srcimg: "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2018/04/02/15226576889042.jpg",
          description: "El Circuito de Barcelona-Catalunya se prepara para recibir a los mejores pilotos de MotoGP del mundo."
      },
      {
          id: 4,
          title: "Campeonato Nacional de Motocross MX",
          date: "2024-07-20",
          srcimg: "https://www.circuitricardotormo.com/wp-content/uploads/2022/03/Circuito-Off-Road-CircuitValencia-derrape.jpg",
          description: "La acción del motocross llega al Circuito Internacional de Valencia con el Campeonato Nacional de Motocross MX."
      },
      {
          id: 5,
          title: "Rally de Tierra de España",
          date: "2024-09-05",
          srcimg: "https://www.visitvalencia.com/sites/default/files/styles/gallery_default/public/crm-images/GALERIA_Circuit%20Ricardo%20Tormo_2.jpg?itok=3TLgjnmO",
          description: "Un evento lleno de velocidad, destreza y acción sin límites."
      },
      {
          id: 6,
          title: "Copa de España de Karting",
          date: "2024-10-12",
          srcimg: "https://offloadmedia.feverup.com/valenciasecreta.com/wp-content/uploads/2023/06/13122430/340169890_250993570607726_8606992159922639233_n.jpg",
          description: "Ven y sé testigo de la velocidad y la habilidad en estado puro."
      }
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

