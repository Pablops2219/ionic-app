import { Component} from '@angular/core';
import { EventService } from '../services/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page{

  events: any[];

  constructor(private eventService: EventService, private router: Router) {
    this.events = this.eventService.getEvents();
  }

  navigateToStreaming() {
    this.router.navigate(['./tabs/streaming']);
  }

}
