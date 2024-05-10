import { Vehicle } from "./vehicle";

export interface User {
    idUser: number;
    name: string;
    last_name: string;
    email: string;
    coins: number;
    icon: string;
    vehicles: Vehicle[];
  }
