import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Rp01PageRoutingModule } from './rp01-routing.module';
import { Rp01Page } from './rp01.page';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Rp01PageRoutingModule,ReactiveFormsModule,Ionic4DatepickerModule
  ],
  declarations: [Rp01Page]
})
export class Rp01PageModule {}
