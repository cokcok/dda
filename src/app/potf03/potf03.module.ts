import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Potf03PageRoutingModule } from './potf03-routing.module';
import { Potf03Page } from './potf03.page';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Potf03PageRoutingModule,Ionic4DatepickerModule,Ng2SearchPipeModule,ReactiveFormsModule
  ],
  declarations: [Potf03Page]
})
export class Potf03PageModule {}
