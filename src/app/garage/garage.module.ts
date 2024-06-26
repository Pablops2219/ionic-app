import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GaragePageRoutingModule } from './garage-routing.module';

import { GaragePage } from './garage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GaragePageRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [GaragePage]
})
export class GaragePageModule { }
