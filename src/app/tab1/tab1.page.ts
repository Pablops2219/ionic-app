import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../services/event.service';
import { UserService} from '../services/user.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  events: any[] = [];
  users: any[] = [];

  constructor(
    public eventService: EventService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.events = this.eventService.getEvents();
  }


  navigateToStreaming() {
    this.router.navigate(['/streaming']);
  }

  navigateToPerfil() {
    this.router.navigate(['/perfil']);
  }

  navigateToEscaner() {
    this.router.navigate(['/home']);
  }
}
