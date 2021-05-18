import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Fix01PageRoutingModule } from './fix01-routing.module';
import { Fix01Page } from './fix01.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { IonicSelectableModule } from 'ionic-selectable';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
import { AutoCompleteModule } from 'ionic4-auto-complete'; 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Fix01PageRoutingModule,ReactiveFormsModule,Ng2SearchPipeModule,IonicSelectableModule,Ionic4DatepickerModule,AutoCompleteModule
  ],
  declarations: [Fix01Page]
})
export class Fix01PageModule {}
