import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Poassign01PageRoutingModule } from './poassign01-routing.module';
import { Poassign01Page } from './poassign01.page';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Poassign01PageRoutingModule,ReactiveFormsModule,Ionic4DatepickerModule,Ng2SearchPipeModule
  ],
  declarations: [Poassign01Page]
})
export class Poassign01PageModule {}
