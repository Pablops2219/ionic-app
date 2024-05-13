import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddUpdateVehicleComponent } from './components/add-update-vehicle/add-update-vehicle.component';



@NgModule({
  declarations: [CustomInputComponent, AddUpdateVehicleComponent],
  exports: [CustomInputComponent,ReactiveFormsModule, AddUpdateVehicleComponent],
  imports: [
    CommonModule, IonicModule, ReactiveFormsModule, FormsModule
  ]
})
export class SharedModule { }
