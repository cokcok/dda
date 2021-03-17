import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Pocfcupon01PageRoutingModule } from './pocfcupon01-routing.module';
import { Pocfcupon01Page } from './pocfcupon01.page';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Pocfcupon01PageRoutingModule,ReactiveFormsModule,Ionic4DatepickerModule,Ng2SearchPipeModule
  ],
  declarations: [Pocfcupon01Page],

})
export class Pocfcupon01PageModule {}
