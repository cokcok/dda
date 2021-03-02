import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Poassign01PageRoutingModule } from './poassign01-routing.module';
import { Poassign01Page } from './poassign01.page';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Poassign01PageRoutingModule,ReactiveFormsModule
  ],
  declarations: [Poassign01Page]
})
export class Poassign01PageModule {}
