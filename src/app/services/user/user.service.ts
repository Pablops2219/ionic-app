import { Injectable } from '@angular/core';

export interface Vehicle {
  id: number;
  make: string;
  model: string;
  year: number;
  userId: number;
  image: string;
  licensePlate: string;
  color: string;
}

export interface User {
  idUser: number;
  name: string;
  last_name: string;
  email: string;
  coins: number;
  icon: string;
  vehicles: Vehicle[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[] = [
    { 
      idUser: 0, 
      name: "Admin", 
      last_name: "Sistema", 
      email: "admin@gmail.com", 
      coins: 1000, 
      icon: "https://www.andiar.com/1667-thickbox_default/pegatina-marquez-93.jpg",
      vehicles: [
        { id: 1, make: "Toyota", model: "Corolla", year: 2020, userId: 1, image: "https://cdn.motor1.com/images/mgl/x7Pvk/s1/4x3/prueba-toyota-corolla-sedan-125h-advance-2021.webp", licensePlate: "4060 JCL", color: "gris" },
        { id: 2, make: "Honda", model: "Civic", year: 2018, userId: 2, image: "", licensePlate: "3298 UVZ", color: "azul"}
      ] 
    },
    { 
      idUser: 1, 
      name: "Joel", 
      last_name: "Pérez Martínez", 
      email: "joelperezmartinez@gmail.com", 
      coins: 100, 
      icon: "https://www.andiar.com/1667-thickbox_default/pegatina-marquez-93.jpg",
      vehicles: [
        { id: 1, make: "Toyota", model: "Corolla", year: 2020, userId: 1, image: "", licensePlate: "3298 UVZ", color: "gris" },
        { id: 2, make: "Honda", model: "Civic", year: 2018, userId: 2, image: "", licensePlate: "3298 UVZ", color: "gris" }
      ]
    },
    { 
      idUser: 2, 
      name: "Pablo", 
      last_name: "Pérnias Santiago", 
      email: "pabloperniassantiago@gmail.com", 
      coins: 200, 
      icon: "https://www.andiar.com/1667-thickbox_default/pegatina-marquez-93.jpg",
      vehicles: [
        { id: 1, make: "Toyota", model: "Corolla", year: 2020, userId: 1, image: "", licensePlate: "3298 UVZ", color: "gris" },
        { id: 2, make: "Honda", model: "Civic", year: 2018, userId: 2, image: "", licensePlate: "3298 UVZ", color: "gris" }
      ]
    },
  ];

  constructor() { }

  getUsers(): any[] {
    return this.users;
  }
}
