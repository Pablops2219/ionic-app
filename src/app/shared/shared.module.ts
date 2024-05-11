import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { LogoComponent } from './components/logo/logo.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [CustomInputComponent,LogoComponent],
  exports: [CustomInputComponent,LogoComponent,ReactiveFormsModule],
  imports: [
    CommonModule, IonicModule, ReactiveFormsModule, FormsModule
  ]
})
export class SharedModule { }
