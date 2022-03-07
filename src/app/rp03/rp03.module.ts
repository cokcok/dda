import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Rp03PageRoutingModule } from './rp03-routing.module';
import { Rp03Page } from './rp03.page';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Rp03PageRoutingModule,ReactiveFormsModule,Ionic4DatepickerModule
  ],
  declarations: [Rp03Page]
})
export class Rp03PageModule {}
