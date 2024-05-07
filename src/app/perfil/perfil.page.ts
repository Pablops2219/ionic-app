import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Location } from '@angular/common';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  color="secondary"

  options: any[] = [];

  constructor(
    private location: Location 
  ) {
   
  }
  

  ngOnInit() {


    console.log('profile ngoninit');
    this.options = [
      {title: 'Vehiculos', icon: 'car-outline', color: 'primary'},
      {title: 'Chat', icon: 'chatbubbles-outline', color: 'primary'},
      {title: 'Wishlist', icon: 'heart-outline', color: 'primary'},
      {title: 'Settings', icon: 'options-outline', color: 'primary'},
      {title: 'Notifications', icon: 'notifications-outline', color: 'primary'},
      {title: 'Logout', icon: 'log-out-outline', color: 'secondary', background: 'primary'},
    ];
  }

  getRows() {
    const rows = [];
    for (let i = 0; i < this.options.length; i += 3) {
      rows.push(this.options.slice(i, i + 3));
    }
    return rows;
  }
  
  

}