import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Po03PageRoutingModule } from './po03-routing.module';
import { Po03Page } from './po03.page';
import { IonicSelectableModule } from 'ionic-selectable';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
import { AutoCompleteModule } from 'ionic4-auto-complete'; 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Po03PageRoutingModule,ReactiveFormsModule,IonicSelectableModule,Ionic4DatepickerModule,AutoCompleteModule
  ],
  declarations: [Po03Page]
})
export class Po03PageModule {}
