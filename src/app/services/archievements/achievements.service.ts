import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AchievementsService {

  achievements = [
    {
      title: 'Primer evento',
      image: 'https://th.bing.com/th/id/R.ea44b482ab49ce7e6e402eab6fff527f?rik=yQqlh0Q4RDKRKg&pid=ImgRaw&r=0',
      reward: 100,
      achieved: false,
    },
    {
      title: 'Primer vehículo',
      image: 'https://th.bing.com/th/id/R.ea44b482ab49ce7e6e402eab6fff527f?rik=yQqlh0Q4RDKRKg&pid=ImgRaw&r=0',
      reward: 100,
      achieved: false,
    },
    {
      title: 'Primer evento de comunidad',
      image: 'https://th.bing.com/th/id/R.ea44b482ab49ce7e6e402eab6fff527f?rik=yQqlh0Q4RDKRKg&pid=ImgRaw&r=0',
      reward: 100,
      achieved: false,
    },
    {
      title: 'Primera promoción',
      image: 'https://th.bing.com/th/id/R.ea44b482ab49ce7e6e402eab6fff527f?rik=yQqlh0Q4RDKRKg&pid=ImgRaw&r=0',
      reward: 100,
      achieved: false,
    },
    {
      title: '1º Evento coches',
      image: 'https://th.bing.com/th/id/R.ea44b482ab49ce7e6e402eab6fff527f?rik=yQqlh0Q4RDKRKg&pid=ImgRaw&r=0',
      reward: 100,
      achieved: false,
    },
    {
      title: 'Elimina un vehículo',
      image: 'https://th.bing.com/th/id/R.ea44b482ab49ce7e6e402eab6fff527f?rik=yQqlh0Q4RDKRKg&pid=ImgRaw&r=0',
      reward: 50,
      achieved: false,
    },
    {
      title: 'Edita un vehículo',
      image: 'https://th.bing.com/th/id/R.ea44b482ab49ce7e6e402eab6fff527f?rik=yQqlh0Q4RDKRKg&pid=ImgRaw&r=0',
      reward: 50,
      achieved: false,
    },
    
  ]

  constructor() { }

  getAchievement() {
    return this.achievements;
  }

  truePrimerEvento(){
    this.achievements[0].achieved = true;
  }

  truePrimerVehiculo(){
    this.achievements[1].achieved = true;
  }

  truePrimerEventoComunidad(){
    this.achievements[2].achieved = true;
  }

  truePrimeraPromocion(){
    this.achievements[3].achieved = true;
  }

  truePGanrEvento(){
    this.achievements[4].achieved = true;
  }

  trueEliminarVehiculo(){
    this.achievements[5].achieved = true;
  }

  trueEditarVehiculo(){
    this.achievements[6].achieved = true;
  }


}
