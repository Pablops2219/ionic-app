import { Component } from '@angular/core';
import { EventService } from '../services/event.service';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page {

  events: any[];

  constructor(private eventService: EventService, private router: Router) {
    this.events = this.eventService.getEvents();
  }

  navigateToStreaming() {
    this.router.navigate(['./tabs/streaming']);
  }


  onClick() {
    const postData = {
      idEvento: 2,
      idCuenta: 1,
      cantidad: 3,
      zona: "BLANCA"
    };
    const headers = {
      'Content-Type': 'application/json'
    };

    axios.post('http://localhost:9000/entrada', postData, {
      headers: headers,
      responseType: 'blob'  // Importante para recibir archivos
    })
      .then(response => {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'entrada.pdf';  // Define aquí el nombre de archivo deseado
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);  // Elimina el enlace después de descargar
        window.URL.revokeObjectURL(url);  // Libera la URL del objeto
      })
      .catch(error => {
        console.error('Error al descargar el PDF:', error);
      });
  }




}
