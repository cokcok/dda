import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Poassign03PageRoutingModule } from './poassign03-routing.module';
import { Poassign03Page } from './poassign03.page';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Poassign03PageRoutingModule,ReactiveFormsModule,Ionic4DatepickerModule,Ng2SearchPipeModule
  ],
  declarations: [Poassign03Page]
})
export class Poassign03PageModule {}
