import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Pocfinstall01PageRoutingModule } from './pocfinstall01-routing.module';
import { Pocfinstall01Page } from './pocfinstall01.page';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Pocfinstall01PageRoutingModule,ReactiveFormsModule,Ionic4DatepickerModule,Ng2SearchPipeModule
  ],
  declarations: [Pocfinstall01Page]
})
export class Pocfinstall01PageModule {}
