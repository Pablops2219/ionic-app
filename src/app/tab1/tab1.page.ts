import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  events: any[] = [];

  constructor(
    public eventService: EventService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.events = this.eventService.getEvents();
  }


  navigateToPerfil() {
    this.router.navigate(['/perfil']);
  }

  navigateToEscaner() {
    this.router.navigate(['/home']);
  }
}
