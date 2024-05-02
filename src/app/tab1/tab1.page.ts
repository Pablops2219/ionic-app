import { Component } from '@angular/core';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})


export class Tab1Page {
  events: any[];

  constructor(private eventService: EventService) {
    this.events = this.eventService.getEvents();
  }
}
