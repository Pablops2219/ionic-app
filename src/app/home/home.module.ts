import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { QrCodeModule } from 'ng-qrcode';

import { HomePageRoutingModule } from './home-routing.module';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';



@NgModule({
  imports: [
    QrCodeModule,
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, BarcodeScanningModalComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule {}
