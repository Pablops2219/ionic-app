import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ComunityService {
  // Supongamos que tienes una lista de eventos
  events = [
    { id: 1, 
      title: 'Evento de autos', 
      date: '2024-05-07', 
      srcimg: 'https://img.remediosdigitales.com/d5bc03/eventos-de-autos-clasicos-2018-1-/450_1000.jpg', 
      description: 'Trae tu automóvil y prepárate para impresionar a todos con su diseño, estilo y características únicas. ¡Los asistentes votarán por su coche favorito y el que reciba más votos se llevará la recompensa!',
      reward: 500
    },
    { id: 2, 
      title: 'Encuesta Campeonato de España de Superbike ESBK', 
      date: '2024-06-01', 
      srcimg: 'https://media.istockphoto.com/id/1257541902/es/vector/podio-de-escenario-con-iluminaci%C3%B3n-escena-de-podio-de-escenario-con-ceremonia-de-premiaci%C3%B3n.jpg?s=612x612&w=0&k=20&c=qXnHcbzL5y1yK_Z0118waxLY0fajCav7DFCgz6KX39A=', 
      description: 'Selecciona los pilotos ganadores, acierta el podio del gran premio y recibe tu recompensa',
      reward: 250
    },
    
    {
      id: 3,
      title: "Evento de autos clásico",
      date: "2024-06-15",
      srcimg: "https://motor.elpais.com/wp-content/uploads/2020/01/pebble-beach.jpg",
      description: 'Trae tu automóvil y prepárate para impresionar a todos con su diseño, estilo y características únicas. ¡Los asistentes votarán por su coche clasico favorito y el que reciba más votos se llevará la recompensa!',
      reward: 550
    },
      
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