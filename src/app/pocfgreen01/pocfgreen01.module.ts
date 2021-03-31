import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Pocfgreen01PageRoutingModule } from './pocfgreen01-routing.module';
import { Pocfgreen01Page } from './pocfgreen01.page';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Pocfgreen01PageRoutingModule,ReactiveFormsModule,Ionic4DatepickerModule,Ng2SearchPipeModule
  ],
  declarations: [Pocfgreen01Page]
})
export class Pocfgreen01PageModule {}
