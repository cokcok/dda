import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Po01PageRoutingModule } from './po01-routing.module';
import { Po01Page } from './po01.page';
import {IonicSelectableModule} from 'ionic-selectable';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
import { AutoCompleteModule } from 'ionic4-auto-complete';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Po01PageRoutingModule,ReactiveFormsModule,IonicSelectableModule,Ionic4DatepickerModule,AutoCompleteModule
  ],
  declarations: [Po01Page]
})
export class Po01PageModule {}
