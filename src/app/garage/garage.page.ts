import { Component, inject, OnInit } from '@angular/core';
import { UtilsService } from '../services/utils.service';
import { AddUpdateVehicleComponent } from '../shared/components/add-update-vehicle/add-update-vehicle.component';

@Component({
  selector: 'app-garage',
  templateUrl: './garage.page.html',
  styleUrls: ['./garage.page.scss'],
})
export class GaragePage implements OnInit {

  utilsSvc = inject(UtilsService);
  
  constructor() { }

  ngOnInit() {
  }

  //======== Agregar o actualizar vehiculo========
  addUpdateVehicle(){
    this.utilsSvc.presentModal({
      component: AddUpdateVehicleComponent,
      cssClass: 'add-update-modal'
    })
  }

}
