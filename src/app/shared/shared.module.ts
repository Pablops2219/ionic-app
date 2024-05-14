import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddUpdateVehicleComponent } from './components/add-update-vehicle/add-update-vehicle.component';
import { CommunityEventsComponent } from './components/community-events/community-events.component';



@NgModule({
  declarations: [CustomInputComponent, AddUpdateVehicleComponent,CommunityEventsComponent],
  exports: [CustomInputComponent,ReactiveFormsModule, AddUpdateVehicleComponent, CommunityEventsComponent],
  imports: [
    CommonModule, IonicModule, ReactiveFormsModule, FormsModule
  ]
})
export class SharedModule { }
