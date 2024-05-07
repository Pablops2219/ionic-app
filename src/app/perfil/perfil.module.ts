import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilPageRoutingModule } from './perfil-routing.module';

import { IonicSlides } from '@ionic/angular';
import { PerfilPage } from './perfil.page';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { QrCodeComponent, QrCodeModule } from 'ng-qrcode';


@NgModule({
  imports: [
    QrCodeModule,
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilPageRoutingModule,
  ],
  declarations: [PerfilPage, BarcodeScanningModalComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PerfilPageModule {
  swiperModules = [IonicSlides];
}

