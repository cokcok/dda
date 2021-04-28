import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Od01PageRoutingModule } from './od01-routing.module';
import { Od01Page } from './od01.page';
import { IonicSelectableModule } from 'ionic-selectable';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
import { AutoCompleteModule } from 'ionic4-auto-complete'; 
import {PipesCommonModule} from '../pipes/pipes-common/pipes-common.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Od01PageRoutingModule,ReactiveFormsModule,IonicSelectableModule,Ionic4DatepickerModule,AutoCompleteModule,PipesCommonModule
  ],
  declarations: [Od01Page]
})
export class Od01PageModule {}
