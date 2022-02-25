import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Rp02PageRoutingModule } from './rp02-routing.module';
import { Rp02Page } from './rp02.page';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Rp02PageRoutingModule,ReactiveFormsModule,Ionic4DatepickerModule
  ],
  declarations: [Rp02Page]
})
export class Rp02PageModule {}
