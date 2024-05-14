import { Component, inject} from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../services/event/event.service';
import { User } from '../models/user.model';
import { FirebaseService } from '../services/firebase/firebase.service';
import { UtilsService } from '../services/utils/utils.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  events: any[] = [];
  users: any[] = [];
  firebaseSvc = inject (FirebaseService);
  utilsSvc = inject (UtilsService);

  constructor(
    public eventService: EventService,
    private router: Router,
    
  ) {}

  ngOnInit() {
    this.events = this.eventService.getEvents();
  }

  user(): User{
    return this.utilsSvc.getFromLocalStorage('user');
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
