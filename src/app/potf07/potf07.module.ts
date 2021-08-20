import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Potf07PageRoutingModule } from './potf07-routing.module';
import { Potf07Page } from './potf07.page';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
import { IonicSelectableModule } from 'ionic-selectable';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Potf07PageRoutingModule,ReactiveFormsModule,Ionic4DatepickerModule,IonicSelectableModule
  ],
  declarations: [Potf07Page]
})
export class Potf07PageModule {}
